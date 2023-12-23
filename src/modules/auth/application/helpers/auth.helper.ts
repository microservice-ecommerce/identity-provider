import { AuthConstant } from '@auth/core/constants';
import { BaseTokenClaimPayload } from '@auth/core/dtos/payloads/token-claim.payload';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IdentityProviderConstant } from '@shared/core/constants';
import { KeyType } from '@shared/core/enums';
import { CacheService } from '@shared/services';
import { UserPayload } from '@user/core/dtos';
import { Request } from 'express';
import { IdentityProviderConfig } from 'src/infrastructure/configuration/identity-provider.config';
import { nowTimeNumber } from '../../../../shared/utils/now-time-number';
import { EncodeTokenPayload, TokenPayload } from '../../core/dtos';
import { DecodeTokenPayload } from '../../core/dtos/payloads/decode-token-claim.payload';
import { H3Logger } from '@high3ar/common-api';

@Injectable()
export class AuthHelper {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _cacheService: CacheService,
  ) {}
  public async createToken(user: UserPayload, expiresInRefreshToken?: number): Promise<TokenPayload> {
    const tokenPayload: EncodeTokenPayload = new EncodeTokenPayload(
      user.account.email,
      IdentityProviderConfig.TOKEN_CLAIM_AUD,
      IdentityProviderConfig.TOKEN_CLAIM_ISS,
      nowTimeNumber(),
      user.account.email,
      user.infoUser.name,
      user.infoUser.address,
      user.infoUser.gender + '',
    );

    const createAccessToken = this._jwtService.signAsync(this._toObject(tokenPayload), {
      secret: IdentityProviderConfig.TOKEN_SECRET_KEY,
      expiresIn: IdentityProviderConstant.ACCESS_TOKEN_EXPIRED,
    });
    const createRefreshToken = this._jwtService.signAsync(this._toObject(tokenPayload), {
      secret: IdentityProviderConfig.TOKEN_SECRET_KEY,
      expiresIn: IdentityProviderConstant.REFRESH_TOKEN_EXPIRED,
    });

    const expiresInAT = nowTimeNumber() + IdentityProviderConstant.ACCESS_TOKEN_EXPIRED;
    const expiresInRT = nowTimeNumber() + IdentityProviderConstant.REFRESH_TOKEN_EXPIRED;

    const [accessToken, refreshToken] = await Promise.all([createAccessToken, createRefreshToken]);

    return new TokenPayload(accessToken, refreshToken, expiresInAT, expiresInRT);
  }

  public setCookies(req: Request, token: TokenPayload): void {
    req.res.cookie(IdentityProviderConstant.NAME_ACCESS_TOKEN, token.accessToken, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: token.expiresInAccessToken,
    });
    req.res.cookie(IdentityProviderConstant.NAME_REFRESH_TOKEN, token.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: token.expiresInRefreshToken,
      path: AuthConstant.endpointRefreshToken,
    });
  }

  public verifyRefreshToken(token: string): DecodeTokenPayload {
    const tokenPayload: BaseTokenClaimPayload = this._jwtService.verify(token, {
      secret: IdentityProviderConfig.TOKEN_SECRET_KEY,
    });
    const decodeTokenPayload: DecodeTokenPayload = new DecodeTokenPayload(tokenPayload);

    this._validateClaim(decodeTokenPayload);
    this._validateRevokeToken(token, KeyType.REFRESH_TOKEN);

    return decodeTokenPayload;
  }

  public getRefreshTokenInBlackList(token: string) {
    const keyString = this._cacheService.getKey(KeyType.REFRESH_TOKEN, token);
    const refreshToken = this._cacheService.get(keyString);
    return refreshToken;
  }

  public getAccessTokenInBlackList(token: string) {
    const keyString = this._cacheService.getKey(KeyType.ACCESS_TOKEN, token);
    const accessToken = this._cacheService.get(keyString);
    return accessToken;
  }

  private _validateClaim(token: BaseTokenClaimPayload) {
    const isValidClaims =
      token.aud !== IdentityProviderConfig.TOKEN_CLAIM_AUD ||
      token.iss !== IdentityProviderConfig.TOKEN_CLAIM_ISS ||
      token.nbf > nowTimeNumber();
    if (!isValidClaims) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async _validateRevokeToken(token: string, keyType: KeyType): Promise<void> {
    let isTokenBlackList = await this.getAccessTokenInBlackList(token);
    if (keyType === KeyType.REFRESH_TOKEN) {
      isTokenBlackList = await this.getRefreshTokenInBlackList(token);
    }
    if (isTokenBlackList) {
      H3Logger.error('Token has been revoked');
      throw new UnauthorizedException('Token has been revoked');
    }
  }

  private _toObject(object: object): Object {
    return JSON.parse(JSON.stringify(object));
  }
}

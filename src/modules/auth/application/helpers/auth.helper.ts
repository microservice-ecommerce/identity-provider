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
    const now = nowTimeNumber();
    const accessTokenPayload: EncodeTokenPayload = new EncodeTokenPayload(
      user.account.email,
      IdentityProviderConfig.TOKEN_CLAIM_AUD,
      IdentityProviderConfig.TOKEN_CLAIM_ISS,
      now,
      now,
      now + IdentityProviderConstant.ACCESS_TOKEN_EXPIRED,
      user.account.email,
      user.infoUser.name,
      user.infoUser.address,
      user.infoUser.gender + '',
    );

    const refreshTokenPayload: EncodeTokenPayload = new EncodeTokenPayload(
      user.account.email,
      IdentityProviderConfig.TOKEN_CLAIM_AUD,
      IdentityProviderConfig.TOKEN_CLAIM_ISS,
      now,
      expiresInRefreshToken || now,
      expiresInRefreshToken || now + IdentityProviderConstant.REFRESH_TOKEN_EXPIRED,
      user.account.email,
      user.infoUser.name,
      user.infoUser.address,
      user.infoUser.gender + '',
    );

    const createAccessToken = this._jwtService.signAsync(this._toObject(accessTokenPayload), {
      secret: IdentityProviderConfig.TOKEN_SECRET_KEY,
    });
    const createRefreshToken = this._jwtService.signAsync(this._toObject(refreshTokenPayload), {
      secret: IdentityProviderConfig.TOKEN_SECRET_KEY,
    });

    const expiresInAT = nowTimeNumber() + IdentityProviderConstant.ACCESS_TOKEN_EXPIRED;
    const expiresInRT = expiresInRefreshToken || nowTimeNumber() + IdentityProviderConstant.REFRESH_TOKEN_EXPIRED;

    const [accessToken, refreshToken] = await Promise.all([createAccessToken, createRefreshToken]);

    return new TokenPayload(accessToken, refreshToken, expiresInAT, expiresInRT);
  }

  public setCookies(req: Request, token: TokenPayload): void {
    req.res.cookie(IdentityProviderConstant.NAME_ACCESS_TOKEN, token.accessToken, {
      httpOnly: true,
      // sameSite: 'none',
      maxAge: token.expiresInAccessToken,
    });
    req.res.cookie(IdentityProviderConstant.NAME_REFRESH_TOKEN, token.refreshToken, {
      httpOnly: true,
      // sameSite: 'none',
      maxAge: token.expiresInRefreshToken,
      path: AuthConstant.endpointAuth,
    });
  }

  public clearCookies(req: Request): void {
    req.res.clearCookie(IdentityProviderConstant.NAME_ACCESS_TOKEN);
    req.res.clearCookie(IdentityProviderConstant.NAME_REFRESH_TOKEN, {
      path: AuthConstant.endpointAuth,
    });
  }

  public async verifyRefreshToken(token: string): Promise<DecodeTokenPayload> {
    const tokenPayload: BaseTokenClaimPayload = await this._jwtService.verifyAsync(token, {
      secret: IdentityProviderConfig.TOKEN_SECRET_KEY,
    });
    const decodeTokenPayload: DecodeTokenPayload = new DecodeTokenPayload(tokenPayload);
    this._validateClaim(decodeTokenPayload);
    await this._validateRevokeToken(decodeTokenPayload.jti, KeyType.REFRESH_TOKEN);

    return decodeTokenPayload;
  }

  public async verifyAccessToken(token: string): Promise<DecodeTokenPayload> {
    const tokenPayload: BaseTokenClaimPayload = await this._jwtService.verifyAsync(token, {
      secret: IdentityProviderConfig.TOKEN_SECRET_KEY,
    });
    const decodeTokenPayload: DecodeTokenPayload = new DecodeTokenPayload(tokenPayload);
    this._validateClaim(decodeTokenPayload);
    await this._validateRevokeToken(decodeTokenPayload.jti, KeyType.ACCESS_TOKEN);
    return decodeTokenPayload;
  }

  public isExistTokenInBlackList(jti: string, keyType: KeyType): Promise<number> {
    const keyString = this._cacheService.getKey(keyType, jti);
    return this._cacheService.existsBL(keyString, jti);
  }

  public async revokeToken(jti: string, keyType: KeyType): Promise<void> {
    let keyString = await this._cacheService.getKey(keyType, jti);
    this._cacheService.addBL(keyString, jti);
  }

  private _validateClaim(token: BaseTokenClaimPayload) {
    const isValidClaims =
      token.aud === IdentityProviderConfig.TOKEN_CLAIM_AUD &&
      token.iss === IdentityProviderConfig.TOKEN_CLAIM_ISS &&
      token.nbf < nowTimeNumber();

    if (!isValidClaims) {
      H3Logger.error('Invalid token claim');
      throw new UnauthorizedException('Invalid token');
    }
  }

  private async _validateRevokeToken(jti: string, keyType: KeyType): Promise<void> {
    const isTokenBlackList = await this.isExistTokenInBlackList(jti, keyType);
    if (isTokenBlackList) {
      H3Logger.error('Token has been revoked');
      throw new UnauthorizedException('Token has been revoked');
    }
  }

  private _toObject(object: object): Object {
    return JSON.parse(JSON.stringify(object));
  }
}

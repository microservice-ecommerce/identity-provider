import { JwtService } from '@nestjs/jwt';
import { IdentityProviderConstant } from '@shared/core/constants';
import { UserPayload } from '@user/core/dtos';
import { IdentityProviderConfig } from 'src/infrastructure/configuration/identity-provider.config';
import { EncodeTokenPayload, TokenPayload } from '../../core/dtos';
import { Injectable } from '@nestjs/common';
import { nowTimeNumber } from '../../../../shared/utils/now-time-number';

@Injectable()
export class AuthHelper {
  constructor(private readonly _jwtService: JwtService) {}
  public async createToken(user: UserPayload): Promise<TokenPayload> {
    const tokenPayload: EncodeTokenPayload = new EncodeTokenPayload(
      user.account.email,
      IdentityProviderConfig.TOKEN_CLAIM_AUD,
      IdentityProviderConfig.TOKEN_CLAIM_ISS,
    );

    const createAccessToken = this._jwtService.signAsync(this._toObject(tokenPayload), {
      secret: IdentityProviderConfig.TOKEN_SECRET_KEY,
      expiresIn: IdentityProviderConstant.ACCESS_TOKEN_EXPIRED,
    });
    const createRefreshToken = this._jwtService.signAsync(this._toObject(tokenPayload), {
      secret: IdentityProviderConfig.TOKEN_SECRET_KEY,
      expiresIn: IdentityProviderConstant.REFRESH_TOKEN_EXPIRED,
    });

    const expiresIn = nowTimeNumber() + IdentityProviderConstant.ACCESS_TOKEN_EXPIRED;

    const [accessToken, refreshToken] = await Promise.all([createAccessToken, createRefreshToken]);

    return new TokenPayload(accessToken, refreshToken, expiresIn);
  }

  private _toObject(object: object): Object {
    return JSON.parse(JSON.stringify(object));
  }
}

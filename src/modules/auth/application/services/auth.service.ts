import { H3Logger } from '@high3ar/common-api';
import { BadRequestException, Inject, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { IdentityProviderConstant } from '@shared/domain/constants';
import { UserPayload, UserRequest, UserResponse } from '@user/domain/dtos';
import { IUserUseCase } from '@user/domain/interfaces';
import { USER_SERVICE } from '@user/domain/token';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { LoginRequest, TokenResponse } from '../../domain/dtos';
import { IAuthUseCase } from '../../domain/interfaces';
import { AuthHelper } from '../helpers/auth.helper';
import { KeyType } from '@shared/domain/enums';
@Injectable()
export class AuthService implements IAuthUseCase {
  constructor(
    @Inject(USER_SERVICE)
    private readonly _userService: IUserUseCase,
    private readonly _authHelper: AuthHelper,
  ) {}

  public async login(req: Request, loginRequest: LoginRequest): Promise<TokenResponse> {
    const user: UserPayload = await this._userService.findOneByEmail(loginRequest.email);

    const isPasswordValid = await this._comparedPassword(loginRequest.password, user);
    if (!isPasswordValid) {
      H3Logger.error(`Password not match with email: ${loginRequest.email}`);
      throw new BadRequestException('Password not match');
    }

    const token = await this._authHelper.createToken(user);
    this._authHelper.setCookies(req, token);

    return new TokenResponse(token.accessToken, token.refreshToken, token.expiresInAccessToken);
  }

  public async register(request: UserRequest): Promise<UserResponse> {
    const user: UserPayload = await this._userService.save(request);
    return new UserResponse(user.infoUser, user.account);
  }

  public async refreshToken(@Req() req: Request): Promise<TokenResponse> {
    const refreshToken = req.cookies[IdentityProviderConstant.NAME_REFRESH_TOKEN];
    if (!refreshToken) {
      H3Logger.error('Refresh token not found');
      throw new UnauthorizedException('Refresh token not found');
    }

    const tokenPayload = await this._authHelper.verifyRefreshToken(refreshToken);

    const user = await this._userService.findOneByEmail(tokenPayload.sub);
    const token = await this._authHelper.createToken(user, tokenPayload.exp);
    this._authHelper.setCookies(req, token);

    this._authHelper.revokeToken(tokenPayload.jti, KeyType.REFRESH_TOKEN);

    return new TokenResponse(token.accessToken, token.refreshToken, token.expiresInAccessToken);
  }

  public async logout(@Req() req: Request): Promise<void> {
    const accessToken = req.cookies[IdentityProviderConstant.NAME_ACCESS_TOKEN];
    const refreshToken = req.cookies[IdentityProviderConstant.NAME_REFRESH_TOKEN];

    if (!accessToken || !refreshToken) {
      H3Logger.error('Token not found');
      throw new UnauthorizedException('Token not found');
    }

    const decodeRefreshToken = await this._authHelper.verifyRefreshToken(refreshToken);
    const decodeAccessToken = await this._authHelper.verifyAccessToken(accessToken);

    this._authHelper.clearCookies(req);

    this._authHelper.revokeToken(decodeRefreshToken.jti, KeyType.REFRESH_TOKEN);
    this._authHelper.revokeToken(decodeAccessToken.jti, KeyType.ACCESS_TOKEN);
  }

  public async check(@Req() req: Request): Promise<object> {
    const accessToken = req.cookies[IdentityProviderConstant.NAME_ACCESS_TOKEN];
    if (!accessToken) {
      H3Logger.error('Access token not found');
      throw new UnauthorizedException('Access token not found');
    }

    const decodeAccessToken = await this._authHelper.verifyAccessToken(accessToken);
    return decodeAccessToken;

  }
  private async _comparedPassword(password: string, user: UserPayload): Promise<boolean> {
    return bcrypt.compare(password, user.account.password);
  }
}

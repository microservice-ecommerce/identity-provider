import { H3Logger } from '@high3ar/common-api';
import { BadRequestException, Inject, Injectable, Req, UnauthorizedException } from '@nestjs/common';
import { IdentityProviderConstant } from '@shared/core/constants';
import { UserPayload, UserRequest, UserResponse } from '@user/core/dtos';
import { IUserUseCase } from '@user/core/interfaces';
import { USER_SERVICE } from '@user/core/token';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { LoginRequest, TokenResponse } from '../../core/dtos';
import { IAuthUseCase } from '../../core/interfaces';
import { AuthHelper } from '../helpers/auth.helper';
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

    const tokenPayload = this._authHelper.verifyRefreshToken(refreshToken);
    const user = await this._userService.findOneByEmail(tokenPayload.sub);
    const token = await this._authHelper.createToken(user, tokenPayload.exp);
    this._authHelper.setCookies(req, token);

    return new TokenResponse(token.accessToken, token.refreshToken, token.expiresInAccessToken);
  }

  private async _comparedPassword(password: string, user: UserPayload): Promise<boolean> {
    return bcrypt.compare(password, user.account.password);
  }
}

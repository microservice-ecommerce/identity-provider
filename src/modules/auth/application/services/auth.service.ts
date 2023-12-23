import { H3Logger } from '@high3ar/common-api';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserPayload, UserRequest, UserResponse } from '@user/core/dtos';
import { IUserUseCase } from '@user/core/interfaces';
import * as bcrypt from 'bcrypt';
import Redis from 'ioredis';
import { IdentityProviderConfig } from 'src/infrastructure/configuration/identity-provider.config';
import { USER_SERVICE } from 'src/modules/user/core/token';
import { LoginRequest, TokenPayload } from '../../core/dtos';
import { IAuthUseCase } from '../../core/interfaces';
import { AuthHelper } from '../helpers/auth.helper';
@Injectable()
export class AuthService implements IAuthUseCase {
  constructor(
    @Inject(IdentityProviderConfig.IO_REDIS_KEY)
    private readonly _redisManager: Redis,
    @Inject(USER_SERVICE)
    private readonly _userService: IUserUseCase,
    private readonly _authHelper: AuthHelper,
  ) {}

  public async login(request: LoginRequest): Promise<TokenPayload> {
    const user: UserPayload = await this._userService.findOneByEmail(request.email);

    const isPasswordValid = await this._comparedPassword(request.password, user);
    if (!isPasswordValid) {
      H3Logger.error(`Password not match with email: ${request.email}`);
      throw new UnauthorizedException('Password not match');
    }

    const token = await this._authHelper.createToken(user);
    return token;
  }

  public async register(request: UserRequest): Promise<UserResponse> {
    const user: UserPayload = await this._userService.save(request);
    return new UserResponse(user.infoUser, user.account);
  }

  private async _comparedPassword(password: string, user: UserPayload): Promise<boolean> {
    return bcrypt.compare(password, user.account.password);
  }
}

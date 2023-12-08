import { H3Logger } from "@high3ar/common-api";
import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserPayload, UserRequest, UserResponse } from "@user/core/dtos";
import { IUserUseCase } from "@user/core/interfaces";
import Redis from 'ioredis';
import { IdentityProviderConfig } from "src/infrastructure/configuration/identity-provider.config";
import { USER_SERVICE } from "src/modules/user/core/token";
import { IAuthUseCase } from '../../core/interfaces';
import { LoginRequest } from "../../core/dtos";
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService implements IAuthUseCase{
  constructor(
    @Inject(IdentityProviderConfig.IO_REDIS_KEY)
    private readonly _redisManager: Redis,
    @Inject(USER_SERVICE)
    private readonly _userService: IUserUseCase
  ){
  }

  public async login(request: LoginRequest){
    const user: UserPayload = await this._userService.findOneByEmail(request.email);
    if(!user){
      H3Logger.error('Email not exist');
      throw new NotFoundException('Email not exist');
    }

    const isPasswordValid = await this._comparedPassword(request.password, user);
    if(!isPasswordValid){
      H3Logger.error(`Password not match with emai: ${request.email}`);
      throw new UnauthorizedException('Password not match');
    }


  }

  public async register(request: UserRequest): Promise<UserResponse> {
    const user : UserPayload= await this._userService.save(request);
    return new UserResponse(user.infoUser, user.account);
  }

  private async _comparedPassword(password: string, user: UserPayload): Promise<boolean>{
    return bcrypt.compare(password, user.account.password);
  }
}

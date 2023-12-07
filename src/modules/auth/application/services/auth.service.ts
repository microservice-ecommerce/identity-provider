import { Inject, Injectable } from "@nestjs/common";
import Redis from 'ioredis';
import { IdentityProviderConfig } from "src/infrastructure/configuration/identity-provider.config";
import { IAccountPort, IUserPort } from "../../../user/core/ports";
import { IAuthUseCase } from '../../core';
import { LoginRequest, RegisterRequest } from "../../core/dtos";
import { ACCOUNT_REPOSITORY, USER_REPOSITORY, USER_SERVICE } from "src/modules/user/core/token";
import { ConvertUtil } from "src/shared/utils/to-entity.util";
import { IUserUseCase } from "@user/core/interfaces";

@Injectable()
export class AuthService implements IAuthUseCase{
  constructor(
    @Inject(IdentityProviderConfig.IO_REDIS_KEY)
    private readonly _redisManager: Redis,
    @Inject(USER_SERVICE)
    private readonly _userService: IUserUseCase
  ){
  }

  public login(request: LoginRequest){
    // const test = this._authRepository.save(account)
  }

  public register(request: RegisterRequest) {

  }
}

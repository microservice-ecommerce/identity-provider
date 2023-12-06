import { Inject, Injectable } from "@nestjs/common";
import Redis from 'ioredis';
import { IdentityProviderConfig } from "src/infrastructure/configuration/identity-provider.config";
import { IAccountPort, IUserPort } from "../../../user/core/ports";
import { IAuthUseCase } from '../../core';
import { LoginRequest, RegisterRequest } from "../../core/dtos";
import { ACCOUNT_REPOSITORY, USER_REPOSITORY } from "src/modules/user/core/token";
import { ConvertUtil } from "src/shared/utils/to-entity.util";

@Injectable()
export class AuthService implements IAuthUseCase{
  constructor(
    @Inject(IdentityProviderConfig.IO_REDIS_KEY)
    private readonly _redisManager: Redis,
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountRepository: IAccountPort,
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: IUserPort,
  ){
  }

  public login(request: LoginRequest){
    // const test = this._authRepository.save(account)
  }

  public register(request: RegisterRequest) {
    const account = ConvertUtil.toAccountEntity(request.account);
    this._accountRepository.create(account);
    console.log(account);
    this._redisManager.set('test', 'test')
  }
}

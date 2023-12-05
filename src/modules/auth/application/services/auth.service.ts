import { Inject, Injectable } from "@nestjs/common";
import { AUTH_REPOSITORY, AccountEntity, IAuthPort, IAuthUseCase } from '../../core';
import { LoginRequest } from "../../core/dtos";
import AuthUtil from "../../infrastructure/utils";
import { IdentityProviderConfig } from "src/config/identity-provider.config";
import Redis from 'ioredis'

@Injectable()
export class AuthService implements IAuthUseCase{
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly _authRepository: IAuthPort,
    @Inject(IdentityProviderConfig.IO_REDIS_KEY)
    private readonly _redisManager: Redis
  ){
  }
  public login(request: LoginRequest){
    const account: AccountEntity = AuthUtil.toEntityAuth(request);
    this._redisManager.set('test', 'test')
    // const test = this._authRepository.save(account)
  }
}

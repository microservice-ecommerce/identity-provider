import { Inject, Injectable } from "@nestjs/common";
import {  AccountEntity, IAuthUseCase } from '../../core';
import { LoginRequest, RegisterRequest } from "../../core/dtos";
import { IdentityProviderConfig } from "src/infrastructure/configuration/identity-provider.config";
import Redis from 'ioredis'

@Injectable()
export class AuthService implements IAuthUseCase{
  constructor(
    @Inject(IdentityProviderConfig.IO_REDIS_KEY)
    private readonly _redisManager: Redis
  ){
  }
  public login(request: LoginRequest){
    // const test = this._authRepository.save(account)
  }

  public register(request: RegisterRequest) {
    console.log(request)
  }
}

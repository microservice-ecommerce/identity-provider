import { Inject, Injectable } from "@nestjs/common";
import { AUTH_REPOSITORY, AccountEntity, IAuthPort, IAuthUseCase } from '../../core';
import { LoginRequest } from "../../core/dtos";
import AuthUtil from "../../infrastructure/utils";

@Injectable()
export class AuthService implements IAuthUseCase{
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly _authRepository: IAuthPort
  ){
  }
  public login(request: LoginRequest){
    const account: AccountEntity = AuthUtil.toEntityAuth(request);
    const test = this._authRepository.save(account)
  }
}

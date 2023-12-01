import { Inject, Injectable } from "@nestjs/common";
import { AUTH_REPOSITORY, IAuthPort, IAuthUseCase } from '../core';

@Injectable()
export class AuthService implements IAuthUseCase{
  constructor(
    @Inject(AUTH_REPOSITORY)
    private readonly _authRepository: IAuthPort
  ){
  }
  public getAll(){
    return this._authRepository.getAll()
  }
}

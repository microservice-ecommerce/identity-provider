import { Inject, Injectable } from "@nestjs/common";
import { IAccount, IUserUseCase } from '../../core/interfaces';
import { IUserPort } from "../../core/ports";
import { ACCOUNT_REPOSITORY, USER_REPOSITORY } from "../../core/token";

@Injectable()
export class UserService implements IUserUseCase{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: IUserPort,
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountRepository: IAccount
  ){
  }
  public getAll(){
    return this._userRepository.getAll()
  }
}

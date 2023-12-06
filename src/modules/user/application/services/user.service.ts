import { Inject, Injectable } from "@nestjs/common";
import { IAccount, IUserUseCase } from '../../core/interfaces';
import { IUserPort } from "../../core/ports";
import { ACCOUNT_REPOSITORY, USER_REPOSITORY } from "../../core/token";
import { AccountRepository } from "../../infrastructure";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService implements IUserUseCase{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: IUserPort,
    @InjectRepository(AccountRepository)
    private readonly _accountRepository: AccountRepository
  ){
  }
  public getAll(){
    return this._userRepository.getAll()
  }
}

import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { IAccount, IUserUseCase } from '../../core/interfaces';
import { IAccountPort, IUserPort } from "../../core/ports";
import { ACCOUNT_REPOSITORY, USER_REPOSITORY } from "../../core/token";
import { AccountRepository } from "../../infrastructure";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountRequest, UserRequest } from "@user/core/dtos";
import { H3Logger } from "@high3ar/common-api";

@Injectable()
export class UserService implements IUserUseCase{
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: IUserPort,
    @Inject(ACCOUNT_REPOSITORY)
    private readonly _accountRepository: IAccountPort
  ){
  }
  public getAll(){
    return this._userRepository.getAll()
  }

  public async save(user: UserRequest, account: AccountRequest){
    const email = this._accountRepository.findByEmail(account.email);
    if(email){
      H3Logger.error('Email already exists');
      throw new BadRequestException('Email already exists');
    }
    const accountEntity = await this._accountRepository.create(account);
    const userEntity = await this._userRepository.create(user);
    console.log(accountEntity);
    console.log(userEntity);
  }
}

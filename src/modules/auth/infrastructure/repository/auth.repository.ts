import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AccountEntity, IAuthPort } from "../../core";

@Injectable()
export class AuthRepository implements IAuthPort{
  constructor(
    @InjectRepository(AccountEntity)
    private readonly _accountRepository: Repository<AccountEntity>
  ){}

  public async save(account: AccountEntity): Promise<AccountEntity> {
    return  this._accountRepository.save(account)
  }
}

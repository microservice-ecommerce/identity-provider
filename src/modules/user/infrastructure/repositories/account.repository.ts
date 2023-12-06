
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "../../core/entities";
import { IAccountPort } from "../../core/ports";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class AccountRepository implements IAccountPort {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly _AccountRepository: Repository<AccountEntity>
  ){}

  public getAll() : string {
    return  'ASDASD';
  }

}

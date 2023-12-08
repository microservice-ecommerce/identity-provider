
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "../../core/entities";
import { IAccountPort } from "../../core/ports";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { BaseAbstractRepository } from "src/shared/repositories/base.repository";

@Injectable()
export class AccountRepository extends BaseAbstractRepository<AccountEntity> implements IAccountPort{
  constructor(
    @InjectRepository(AccountEntity)
    private readonly _userRepository: Repository<AccountEntity>
  ){
    super(_userRepository);
  }

  public getAll() : string {
    return  'ASDASD';
  }

  public findByEmail(email: string): Promise<AccountEntity> {
      return this._userRepository.findOne({
        where: {
          email
        }
      });
  }

}

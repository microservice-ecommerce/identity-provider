import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from '@shared/infrastructure/repositories/base.repository';
import { AccountModel } from '@user/domain/models';
import { IAccountPort } from '@user/domain/ports';
import { Repository } from 'typeorm';
import { AccountEntity } from '../mappers';

@Injectable()
export class AccountRepository extends BaseAbstractRepository<AccountEntity, AccountModel> implements IAccountPort {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly _userRepository: Repository<AccountEntity>,
  ) {
    super(_userRepository);
  }

  public getAll(): string {
    return 'ASDASD';
  }

  public async findByEmail(email: string): Promise<AccountModel> {
    const entity = await this._userRepository.findOne({
      where: {
        email,
      },
    });
    return entity ? this.toModel(entity) : null;
  }

  public toModel(entity: AccountEntity): AccountModel {
    return {
      id: entity.id,
      email: entity.email,
      password: entity.password,
      user: entity.user,
      salt: entity.salt,
      lastLoginIp: entity.lastLoginIp,
      passwordChanged: entity.passwordChanged,
      lastLogin: entity.lastLogin,
      createdDate: entity.createdDate,
      modifiedDate: entity.modifiedDate,
    } as unknown as AccountModel;
  }

  public toEntity(model: AccountModel): AccountEntity {
    const object = {
      id: model.id,
      email: model.email,
      password: model.password,
      salt: model.salt,
      lastLoginIp: model.lastLoginIp,
      passwordChanged: model.passwordChanged,
      lastLogin: model.lastLogin,
      createdDate: model.createdDate,
      modifiedDate: model.modifiedDate,
    };

    const entity = new AccountEntity(object);
    return entity;
  }
}

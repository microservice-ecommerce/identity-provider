import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from '@shared/repositories/base.repository';
import { AccountModel, InfoUserModel } from '@user/domain/models';
import { Repository } from 'typeorm';
import { IUserPort } from '../../../modules/user/domain/ports';
import { AccountEntity, InfoUserEntity } from '../mappers';

@Injectable()
export class UserRepository extends BaseAbstractRepository<InfoUserEntity, InfoUserModel> implements IUserPort {
  constructor(
    @InjectRepository(InfoUserEntity)
    private readonly _userRepository: Repository<InfoUserEntity>,
  ) {
    super(_userRepository);
  }

  public async findOneById(id: number): Promise<InfoUserModel | null> {
    const entity = await this._userRepository.findOne({
      where: {
        id,
      },
      relations: ['account'],
    });
    return entity ? this.toModel(entity) : null;
  }

  public toModel(entity: InfoUserEntity): InfoUserModel {
    return {
      id: entity.id,
      account: {
        id: entity.account.id,
        email: entity.account.email,
      } as AccountModel,
      name: entity.name,
      phoneNumber: entity.phoneNumber,
      dateOfBirth: entity.dateOfBirth,
      gender: entity.gender,
      address: entity.address,
      createdDate: entity.createdDate,
      modifiedDate: entity.modifiedDate,
    } as InfoUserModel;
  }

  public toEntity(model: InfoUserModel): InfoUserEntity {
    const object = {
      id: model.id,
      account: {
        id: model.account.id,
        email: model.account.email,
      } as AccountEntity,
      address: model.address,
      dateOfBirth: model.dateOfBirth,
      gender: model.gender,
      name: model.name,
      phoneNumber: model.phoneNumber,
    };
    return new InfoUserEntity(object);
  }
}

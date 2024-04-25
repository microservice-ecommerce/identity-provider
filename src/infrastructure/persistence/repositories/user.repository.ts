import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from '@shared/infrastructure/repositories/base.repository';
import { AccountModel, UserModel } from '@user/domain/models';
import { Repository } from 'typeorm';
import { IUserPort } from '../../../modules/user/domain/ports';
import { AccountEntity, UserEntity } from '../mappers';

@Injectable()
export class UserRepository extends BaseAbstractRepository<UserEntity, UserModel> implements IUserPort {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {
    super(_userRepository);
  }

  public async findOneById(id: number): Promise<UserModel | null> {
    const entity = await this._userRepository.findOne({
      where: {
        id,
      },
      relations: ['account'],
    });
    return entity ? this.toModel(entity) : null;
  }

  public toModel(entity: UserEntity): UserModel {
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
    } as UserModel;
  }

  public toEntity(model: UserModel): UserEntity {
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
      userToRole: null,
    };
    return new UserEntity(object);
  }
}

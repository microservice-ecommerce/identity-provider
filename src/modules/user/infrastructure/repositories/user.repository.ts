import { Injectable } from '@nestjs/common';
import { IUserPort } from '../../core/ports';
import { InjectRepository } from '@nestjs/typeorm';
import { USER_REPOSITORY } from '../../core/token';
import { Repository } from 'typeorm';
import { InfoUserEntity } from '../../core/entities';
import { BaseAbstractRepository } from '@shared/repositories/base.repository';

@Injectable()
export class UserRepository extends BaseAbstractRepository<InfoUserEntity> implements IUserPort {
  constructor(
    @InjectRepository(InfoUserEntity)
    private readonly _userRepository: Repository<InfoUserEntity>,
  ) {
    super(_userRepository);
  }

  public findOneById(id: number): Promise<InfoUserEntity> {
    return this._userRepository.findOne({
      where: {
        id,
      },
      relations: ['account'],
    });
  }
}

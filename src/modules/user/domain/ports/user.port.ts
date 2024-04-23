import { BaseInterfaceRepository } from '@shared/repositories/base.interface';
import { UserEntity } from '../../../../infrastructure/persistence/mappers';
import { AccountModel, UserModel } from '../models';

export interface IUserPort extends BaseInterfaceRepository<UserEntity, UserModel> {}

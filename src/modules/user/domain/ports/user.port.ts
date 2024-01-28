import { BaseInterfaceRepository } from '@shared/repositories/base.interface';
import { InfoUserEntity } from '../../../../infrastructure/persistence/mappers';
import { AccountModel, InfoUserModel } from '../models';

export interface IUserPort extends BaseInterfaceRepository<InfoUserEntity, InfoUserModel> {}

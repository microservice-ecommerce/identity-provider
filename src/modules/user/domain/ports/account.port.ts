import { BaseInterfaceRepository } from '@shared/infrastructure/repositories/base.interface';
import { AccountEntity } from '../../../../infrastructure/persistence/mappers';
import { AccountModel } from '../models';

export interface IAccountPort extends BaseInterfaceRepository<AccountEntity, AccountModel> {
  getAll(): string;

  findByEmail(email: string): Promise<AccountModel | null>;
}

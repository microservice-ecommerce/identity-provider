import { AccountEntity } from '../entities';
import { BaseInterfaceRepository } from 'src/shared/repositories/base.interface';

export interface IAccountPort extends BaseInterfaceRepository<AccountEntity> {
  getAll(): string;

  findByEmail(email: string): Promise<AccountEntity | null>;
}

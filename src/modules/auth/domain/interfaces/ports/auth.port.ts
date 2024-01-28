import { AccountEntity } from '@infrastructure/persistence/mappers';

export interface IAuthPort {
  save(acount: AccountEntity): Promise<AccountEntity>;
}

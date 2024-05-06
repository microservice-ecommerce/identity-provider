import { IAuditSoftDeleteBase } from '@shared/domain/interfaces';
import { IAccount } from './account.interface';
export interface IUser extends IAuditSoftDeleteBase {
  id?: number;
  account: IAccount;
  name: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: boolean;
  address: string;
}

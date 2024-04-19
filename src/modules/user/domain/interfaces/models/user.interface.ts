import { IAuditBase } from '@shared/core/interfaces';
import { IAccount } from './account.interface';
export interface IInfoUser extends IAuditBase {
  id?: number;
  account: IAccount;
  name: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: boolean;
  address: string;
}

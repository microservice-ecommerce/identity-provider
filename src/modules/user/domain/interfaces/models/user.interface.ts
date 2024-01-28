import { IModelBase } from '@high3ar/common-api';
import { IAccount } from './account.interface';
export interface IInfoUser extends IModelBase {
  id?: number;
  account: IAccount;
  name: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: boolean;
  address: string;
}

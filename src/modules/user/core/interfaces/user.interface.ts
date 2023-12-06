
import { IModelBase } from '@high3ar/common-api';
export interface IUser extends IModelBase{
  id?: number;
  accountId: number;
  name: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: boolean;
  address: string;
}

import { IUserToRole } from '@authorization/domain/interfaces';
import { IAuditSoftDeleteBase } from '@shared/core/interfaces';
import { IAccount } from './account.interface';
export interface IUser extends IAuditSoftDeleteBase {
  id?: number;
  account: IAccount;
  userToRole: IUserToRole[];
  name: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: boolean;
  address: string;
}

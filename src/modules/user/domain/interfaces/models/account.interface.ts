import { IAuditSoftDeleteBase } from '@shared/domain/interfaces';
import { IUser } from './user.interface';
export interface IAccount extends IAuditSoftDeleteBase {
  id?: number;
  email: string;
  user?: IUser;
  password: string;
  salt: string;
  lastLoginIp: string;
  passwordChanged: Date;
  lastLogin: Date;
}

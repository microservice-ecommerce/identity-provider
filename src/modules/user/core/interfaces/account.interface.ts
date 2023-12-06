
import { IModelBase } from '@high3ar/common-api';
export interface IAccount extends IModelBase{
  id?: number;
  email: string;
  password: string;
  salt: string;
  lastLoginIp: string;
  passwordChanged: Date;
  lastLogin: Date;
}

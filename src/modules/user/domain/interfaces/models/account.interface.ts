
import { IModelBase } from '@high3ar/common-api';
import { UserModule } from '@user/user.module';
export interface IAccount extends IModelBase{
  id?: number;
  email: string;
  user?: UserModule;
  password: string;
  salt: string;
  lastLoginIp: string;
  passwordChanged: Date;
  lastLogin: Date;
}

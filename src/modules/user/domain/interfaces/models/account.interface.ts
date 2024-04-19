import { IAuditSoftDeleteBase } from '@shared/core/interfaces';
import { UserModule } from '@user/user.module';
export interface IAccount extends IAuditSoftDeleteBase {
  id?: number;
  email: string;
  user?: UserModule;
  password: string;
  salt: string;
  lastLoginIp: string;
  passwordChanged: Date;
  lastLogin: Date;
}

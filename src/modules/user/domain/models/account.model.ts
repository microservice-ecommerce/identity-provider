import { AuditModelBase } from '@shared/domain/models';
import { IAccount } from '../interfaces';
import { UserModel } from './user.model';

export class AccountModel extends AuditModelBase implements IAccount {
  id?: number;
  email: string;
  user?: UserModel;
  password: string;
  salt: string;
  lastLoginIp: string;
  passwordChanged: Date;
  lastLogin: Date;

  constructor(
    email: string,
    password: string,
    salt: string,
    lastLoginIp: string,
    passwordChanged: Date,
    lastLogin: Date,
    createdDate: Date = new Date(),
    updatedDate: Date = new Date(),
    id?: number,
    user?: UserModel,
  ) {
    super(createdDate, updatedDate);
    this.id = id;
    this.email = email;
    this.password = password;
    this.salt = salt;
    this.lastLoginIp = lastLoginIp;
    this.passwordChanged = passwordChanged;
    this.lastLogin = lastLogin;
    this.user = user;
  }
}

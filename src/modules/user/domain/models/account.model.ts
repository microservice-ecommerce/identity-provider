import { BaseModel } from '@shared/core/models';
import { IAccount } from '../interfaces';
import { InfoUserModel } from './info-user.model';

export class AccountModel extends BaseModel implements IAccount {
  id?: number;
  email: string;
  user?: InfoUserModel;
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
    user?: InfoUserModel,
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

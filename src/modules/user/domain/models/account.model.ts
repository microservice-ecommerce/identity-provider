import { BaseModel } from '@shared/domain/models';
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

  constructor(model: IAccount) {
    super();
    Object.assign(this, model);
  }
}

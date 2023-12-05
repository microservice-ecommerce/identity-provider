import { IModelBase } from "../../../../shared/core/interfaces";

export interface IAccount extends IModelBase{
  id?: number;
  email: string;
  password: string;
  salt: string;
  lastLoginIp: string;
  passwordChanged: Date;
  lastLogin: Date;
}

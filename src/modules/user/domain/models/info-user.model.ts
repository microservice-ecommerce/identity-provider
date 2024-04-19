import { InfoUserRequest } from '@user/domain/dtos';
import { IInfoUser } from '../interfaces';
import { AccountModel } from './account.model';
import { AuditModelBase } from '@shared/core/models';

export class InfoUserModel extends AuditModelBase implements IInfoUser {
  id?: number;
  account: AccountModel;
  name: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: boolean;
  address: string;

  constructor(
    account: AccountModel,
    name: string,
    phoneNumber: string,
    dateOfBirth: Date,
    gender: boolean,
    address: string,
    id?: number,
    createdDate: Date = new Date(),
    updatedDate: Date = new Date(),
  ) {
    super(createdDate, updatedDate);
    this.id = id;
    this.account = account;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.dateOfBirth = dateOfBirth;
    this.gender = gender;
    this.address = address;
  }

  update(request: InfoUserRequest) {
    this.name = request.name;
    this.phoneNumber = request.phoneNumber;
    this.address = request.address;
    this.dateOfBirth = request.dateOfBirth;
    this.gender = request.gender;
  }
}

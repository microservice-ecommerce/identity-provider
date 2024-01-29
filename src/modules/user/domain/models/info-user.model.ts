import { InfoUserRequest } from '@user/domain/dtos';
import { IInfoUser } from '../interfaces';
import { AccountModel } from './account.model';
import { BaseModel } from '@shared/domain/models';

export class InfoUserModel extends BaseModel implements IInfoUser {
  id?: number;
  account: AccountModel;
  name: string;
  phoneNumber: string;
  dateOfBirth: Date;
  gender: boolean;
  address: string;

  constructor(props: IInfoUser) {
    super();
    Object.assign(this, props);
  }

  update(request: InfoUserRequest) {
    this.name = request.name;
    this.phoneNumber = request.phoneNumber;
    this.address = request.address;
    this.dateOfBirth = request.dateOfBirth;
    this.gender = request.gender;
  }
}

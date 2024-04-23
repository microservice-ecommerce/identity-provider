import { AccountModel, UserModel } from '@user/domain/models';

export class UserPayload {
  account: AccountModel;

  infoUser: UserModel;

  constructor(infoUser: UserModel, account: AccountModel) {
    this.account = account;
    this.infoUser = infoUser;
  }
}

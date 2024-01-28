import { AccountModel, InfoUserModel } from "@user/domain/models";

export class UserPayload {
  account: AccountModel;

  infoUser: InfoUserModel;

  constructor(infoUser: InfoUserModel, account: AccountModel) {
    this.account = account;
    this.infoUser = infoUser;
  }
}

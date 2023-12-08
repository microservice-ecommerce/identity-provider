import { AccountEntity, InfoUserEntity } from "@user/core/entities";
export class UserPayload{

  account: AccountEntity;

  infoUser: InfoUserEntity;

  constructor(infoUser: InfoUserEntity, account: AccountEntity){
    this.account = account;
    this.infoUser = infoUser;
  }
}

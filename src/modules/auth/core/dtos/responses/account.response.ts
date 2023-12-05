import { AccountEntity } from "../../entities";

export class AccountResponse{

  email: string;

  password: string;
  constructor(entity: AccountEntity) {
    this.email = entity.email;
    this.password = entity.password;
  }
}

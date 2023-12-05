import { AccountEntity } from "../../entities";

export interface IAuthPort{
  save(acount: AccountEntity): Promise<AccountEntity>
}

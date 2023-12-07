import { AccountEntity } from "@user/core/entities";

export interface IAuthPort{
  save(acount: AccountEntity): Promise<AccountEntity>
}

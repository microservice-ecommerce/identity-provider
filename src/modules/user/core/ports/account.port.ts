import { Repository } from "typeorm";
import { AccountEntity } from "../entities";
import { BaseInterfaceRepository } from "src/shared/repositories/base.interface";

export interface IAccountPort extends BaseInterfaceRepository<AccountEntity>{
  getAll(): string
}

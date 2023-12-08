import { BaseInterfaceRepository } from "@shared/repositories/base.interface"
import { InfoUserEntity } from "../entities"

export interface IUserPort extends BaseInterfaceRepository<InfoUserEntity>{
  getAll(): string

}

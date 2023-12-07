import { BaseInterfaceRepository } from "@shared/repositories/base.interface"
import { UserEntity } from "../entities"

export interface IUserPort extends BaseInterfaceRepository<UserEntity>{
  getAll(): string

}

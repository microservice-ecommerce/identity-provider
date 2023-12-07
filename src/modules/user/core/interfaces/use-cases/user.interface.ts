import { AccountEntity } from "@auth/core"
import { AccountRequest, UserRequest } from "@user/core/dtos"
import { UserEntity } from "@user/core/entities"

export interface IUserUseCase{
   getAll(): string

   save(user:UserRequest, account: AccountRequest): Promise<any>
}

import { AccountRequest, UserRequest } from "@user/core/dtos"

export interface IUserUseCase{
   getAll(): string

   save(user:UserRequest, account: AccountRequest): Promise<any>
}

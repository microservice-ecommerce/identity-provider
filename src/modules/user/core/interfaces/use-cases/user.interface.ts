import { AccountRequest, UserRequest, UserResponse } from "@user/core/dtos"

export interface IUserUseCase{
   getAll(): string

   save(request: UserRequest): Promise<UserResponse>
}

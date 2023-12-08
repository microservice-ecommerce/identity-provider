import { UserPayload, UserRequest } from "@user/core/dtos"

export interface IUserUseCase{
   getAll(): string

   save(request: UserRequest): Promise<UserPayload>

   findOneByEmail(email : string) : Promise<UserPayload>
}

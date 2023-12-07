import { UserRequest } from "@user/core/dtos";
import { LoginRequest } from "../../dtos";

export interface IAuthUseCase{
   login(request:LoginRequest)
   register(request: UserRequest)
}

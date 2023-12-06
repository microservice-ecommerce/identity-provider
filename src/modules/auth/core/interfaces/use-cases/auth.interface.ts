import { LoginRequest, RegisterRequest } from "../../dtos";

export interface IAuthUseCase{
   login(request:LoginRequest)
   register(request: RegisterRequest)
}

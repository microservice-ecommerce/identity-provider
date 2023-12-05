import { LoginRequest } from "../../dtos";

export interface IAuthUseCase{
   login(request:LoginRequest)
}

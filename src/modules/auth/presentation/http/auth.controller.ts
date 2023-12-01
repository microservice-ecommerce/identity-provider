import { Controller, Get, Inject, Param } from "@nestjs/common";
import { AUTH_SERVICE, IAuthUseCase } from "../../core";



@Controller('auth')
export class AuthController{
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly _authService: IAuthUseCase){}

  @Get()
  public getAll(){
    return this._authService.getAll()
  }
}

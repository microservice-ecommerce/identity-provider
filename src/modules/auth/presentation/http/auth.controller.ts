import { Body, Controller, Get, Inject, Param, Post, UsePipes } from "@nestjs/common";
import { AUTH_SERVICE, IAuthUseCase } from "../../core";
import { LoginRequest } from "../../core/dtos";
import ValidatePipe from '../../../../shared/pipes/validation.pipe'

@Controller('v1/auth')
export class AuthController{
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly _authService: IAuthUseCase){}

  @Post('login')
  @UsePipes(new ValidatePipe())
  public login(@Body() request: LoginRequest){
    return this._authService.login(request)
  }
}

import { Body, Controller, Get, Inject, Param, Post, UseInterceptors, UsePipes } from "@nestjs/common";
import { AUTH_SERVICE, IAuthUseCase } from "../../core";
import { LoginRequest } from "../../core/dtos";
import { TestRequest } from "../../core/dtos/requests/test";
import {ValidationPipe} from "@high3ar/common-api";
@Controller('v1/auth')
export class AuthController{
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly _authService: IAuthUseCase){}

  @Post('login')
  @UsePipes(new ValidationPipe())
  public login(@Body() request: LoginRequest){
    return this._authService.login(request)
  }
}

import { ValidationPipe } from "@high3ar/common-api";
import { Body, Controller, Inject, Post, UsePipes } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { AUTH_SERVICE, IAuthUseCase } from "../../core";
import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "../../core/dtos";
@Controller('v1/auth')
export class AuthController{
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly _authService: IAuthUseCase){}


  @Post('login')
  @ApiOperation({
    summary: 'Login username and password',
  })
  @ApiBody({ type: LoginRequest, required: true })
  @ApiOkResponse({ description: 'Login Successful.', type: LoginResponse })
  @UsePipes(new ValidationPipe())
  public login(@Body() request: LoginRequest){
    return this._authService.login(request)
  }


  @Post('register')
  @ApiOperation({
    summary: 'Register user',
  })
  @ApiBody({ type: RegisterRequest, required: true })
  @ApiOkResponse({ description: 'Register Successful.', type: RegisterResponse })
  @UsePipes(new ValidationPipe())
  public register(@Body() request: RegisterRequest){
    return this._authService.register(request)
  }
}

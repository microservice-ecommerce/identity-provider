import {  CoreApiResponse, H3Logger, ValidationPipe } from "@high3ar/common-api";
import { Body, Controller, Inject, Logger, Post } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AUTH_SERVICE, IAuthUseCase } from "../../core";
import { LoginRequest, LoginResponse, RegisterResponse } from "../../core/dtos";
import { UserRequest } from "@user/core/dtos";

@Controller('v1/auth')
@ApiTags("Authentication")
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
  public login(@Body() request: LoginRequest){
    return this._authService.login(request)
  }


  @Post('register')
  @ApiOperation({
    summary: 'Register user',
  })
  @ApiBody({ type: UserRequest, required: true })
  @ApiOkResponse({ description: 'Register Successful.', type: RegisterResponse })
  public async register(@Body() request: UserRequest): Promise<CoreApiResponse<any>>{
    H3Logger.info('req :: GET ::  regiser user')
    await this._authService.register(request)
    H3Logger.info('req :: GET ::  regiser user')
    return CoreApiResponse.success( null,'Register Successful')
  }
}

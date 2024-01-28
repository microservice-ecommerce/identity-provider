import { IAuthUseCase } from '@auth/domain/interfaces';
import { AUTH_SERVICE } from '@auth/domain/token';
import { CoreApiResponse, H3Logger } from '@high3ar/common-api';
import { Body, Controller, Delete, Inject, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserRequest, UserResponse } from '@user/domain/dtos';
import { LoginRequest, TokenResponse } from '../../domain/dtos';
import { AuthSwagger } from '../swagger';

@Controller(AuthSwagger.prefix)
@ApiTags(AuthSwagger.tags)
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly _authService: IAuthUseCase,
  ) {}

  @Post(AuthSwagger.login.url)
  @ApiOperation({
    summary: AuthSwagger.login.summary,
  })
  @ApiBody({ type: LoginRequest, required: true })
  @ApiOkResponse({ description: AuthSwagger.login.summary, type: TokenResponse })
  public async login(@Req() req: Request, @Body() request: LoginRequest): Promise<CoreApiResponse<TokenResponse>> {
    H3Logger.info('req :: POST ::  login user');
    const response = await this._authService.login(req, request);
    H3Logger.info('req :: POST ::  login user');
    return CoreApiResponse.success(response);
  }

  @Post(AuthSwagger.register.url)
  @ApiOperation({
    summary: AuthSwagger.register.summary,
  })
  @ApiBody({ type: UserRequest, required: true })
  @ApiOkResponse({ description: AuthSwagger.register.description, type: UserResponse })
  public async register(@Body() request: UserRequest): Promise<CoreApiResponse<UserResponse>> {
    H3Logger.info('req :: GET ::  register user');
    const user = await this._authService.register(request);
    H3Logger.info('req :: GET ::  register user');
    return CoreApiResponse.success(user);
  }

  @Post(AuthSwagger.refreshToken.url)
  @ApiOperation({
    summary: AuthSwagger.refreshToken.summary,
  })
  @ApiOkResponse({ description: AuthSwagger.refreshToken.description, type: TokenResponse })
  public async refreshToken(@Req() req): Promise<CoreApiResponse<TokenResponse>> {
    H3Logger.info('req :: POST ::  refresh token');
    const response = await this._authService.refreshToken(req);
    H3Logger.info('req :: POST ::  refresh token');
    return CoreApiResponse.success(response);
  }

  @Delete(AuthSwagger.logout.url)
  @ApiOperation({
    summary: AuthSwagger.logout.summary,
  })
  @ApiOkResponse({ description: AuthSwagger.logout.description })
  public async logout(@Req() req): Promise<CoreApiResponse<void>> {
    H3Logger.info('req :: POST ::  logout');
    const response = await this._authService.logout(req);
    H3Logger.info('req :: POST ::  logout');
    return CoreApiResponse.success(null, 'Logout successful');
  }
}

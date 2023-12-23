import { IAuthUseCase } from '@auth/core/interfaces';
import { AUTH_SERVICE } from '@auth/core/token';
import { AuthConfig } from '@auth/infrastructure';
import { CoreApiResponse, H3Logger } from '@high3ar/common-api';
import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserRequest, UserResponse } from '../../../user/core/dtos';
import { LoginRequest, TokenResponse } from '../../core/dtos';

@Controller(AuthConfig.prefix)
@ApiTags('Authentication')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly _authService: IAuthUseCase,
  ) {}

  @Post(AuthConfig.login.url)
  @ApiOperation({
    summary: AuthConfig.login.summary,
  })
  @ApiBody({ type: LoginRequest, required: true })
  @ApiOkResponse({ description: AuthConfig.login.summary, type: TokenResponse })
  public async login(@Req() req: Request, @Body() request: LoginRequest): Promise<CoreApiResponse<TokenResponse>> {
    H3Logger.info('req :: POST ::  login user');
    const response = await this._authService.login(req, request);
    H3Logger.info('req :: POST ::  login user');
    return CoreApiResponse.success(response);
  }

  @Post(AuthConfig.register.url)
  @ApiOperation({
    summary: AuthConfig.register.summary,
  })
  @ApiBody({ type: UserRequest, required: true })
  @ApiOkResponse({ description: AuthConfig.register.description, type: UserResponse })
  public async register(@Body() request: UserRequest): Promise<CoreApiResponse<UserResponse>> {
    H3Logger.info('req :: GET ::  regiser user');
    const user = await this._authService.register(request);
    H3Logger.info('req :: GET ::  regiser user');
    return CoreApiResponse.success(user);
  }

  @Post(AuthConfig.refreshToken.url)
  @ApiOperation({
    summary: AuthConfig.refreshToken.summary,
  })
  @ApiOkResponse({ description: AuthConfig.refreshToken.description, type: TokenResponse })
  public async refreshToken(@Req() req): Promise<CoreApiResponse<TokenResponse>> {
    H3Logger.info('req :: POST ::  refresh token');
    const response = await this._authService.refreshToken(req);
    H3Logger.info('req :: POST ::  refresh token');
    return CoreApiResponse.success(response);
  }
}

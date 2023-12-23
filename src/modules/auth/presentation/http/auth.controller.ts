import { IAuthUseCase } from '@auth/core/interfaces';
import { AUTH_SERVICE } from '@auth/core/token';
import { CoreApiResponse, H3Logger } from '@high3ar/common-api';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRequest, UserResponse } from '../../../user/core/dtos';
import { LoginRequest, TokenPayload } from '../../core/dtos';

@Controller('v1/auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly _authService: IAuthUseCase,
  ) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login username and password',
  })
  @ApiBody({ type: LoginRequest, required: true })
  @ApiOkResponse({ description: 'Login Successful.', type: TokenPayload })
  public async login(@Body() request: LoginRequest): Promise<CoreApiResponse<TokenPayload>> {
    H3Logger.info('req :: POST ::  login user');
    const response = await this._authService.login(request);
    H3Logger.info('req :: POST ::  login user');
    return CoreApiResponse.success(response);
  }

  @Post('register')
  @ApiOperation({
    summary: 'Register user',
  })
  @ApiBody({ type: UserRequest, required: true })
  @ApiOkResponse({ description: 'Register Successful.', type: UserResponse })
  public async register(@Body() request: UserRequest): Promise<CoreApiResponse<UserResponse>> {
    H3Logger.info('req :: GET ::  regiser user');
    const user = await this._authService.register(request);
    H3Logger.info('req :: GET ::  regiser user');
    return CoreApiResponse.success(user);
  }
}

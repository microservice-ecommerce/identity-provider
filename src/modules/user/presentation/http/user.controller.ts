import { Controller, Get, Inject, Param } from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { IUserUseCase } from '../../core/interfaces';
import { USER_SERVICE } from '../../core/token';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthConfig } from '@auth/infrastructure';
import { UserConfig } from '@user/infrastructure/configuration';
import { Headers } from '@nestjs/common';
import { CoreApiResponse, H3Logger } from '@high3ar/common-api';
import { UserResponse } from '@user/core/dtos';

@ApiTags(UserConfig.tag)
@Controller(UserConfig.prefix)
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly _userService: IUserUseCase,
  ) {}

  @Get(UserConfig.profile.url)
  @ApiOperation({
    summary: UserConfig.profile.summary,
  })
  @ApiBody({ type: UserConfig.profile.description, required: true })
  public async getProfile(@Headers('x-userid') userId: number): Promise<CoreApiResponse<UserResponse>> {
    H3Logger.info('req :: GET ::  get profile');
    const response = await this._userService.getOne(userId);
    H3Logger.info('req :: GET ::  get profile');
    return CoreApiResponse.success(response);
  }
}

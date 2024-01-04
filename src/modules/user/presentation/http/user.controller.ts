import { CoreApiResponse, H3Logger } from '@high3ar/common-api';
import { Body, Controller, Get, Headers, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InfoUserRequest, UserRequest, UserResponse } from '@user/core/dtos';
import { UserSwagger } from '@user/infrastructure/swagger';
import { IUserUseCase } from '../../core/interfaces';
import { USER_SERVICE } from '../../core/token';

@ApiTags(UserSwagger.tags)
@Controller(UserSwagger.prefix)
export class UserController {
  constructor(
    @Inject(USER_SERVICE)
    private readonly _userService: IUserUseCase,
  ) {}

  @Get(UserSwagger.profile.url)
  @ApiOperation({
    summary: UserSwagger.profile.summary,
    description: UserSwagger.profile.description,
  })
  @ApiBody({ required: true })
  public async detail(@Headers('x-userid') userId: number): Promise<CoreApiResponse<UserResponse>> {
    H3Logger.info('req :: GET ::  get profile');
    const response = await this._userService.getOne(userId);
    H3Logger.info('req :: GET ::  get profile');
    return CoreApiResponse.success(response);
  }

  @Post(UserSwagger.create.url)
  @ApiOperation({
    summary: UserSwagger.create.summary,
    description: UserSwagger.create.description,
  })
  @ApiBody({ required: true })
  public async create(@Body() request: UserRequest): Promise<CoreApiResponse<UserResponse>> {
    H3Logger.info('req :: POST ::  create user');
    const response = await this._userService.save(request);
    H3Logger.info('req :: POST ::  create user');
    return CoreApiResponse.success(response);
  }

  @Put(UserSwagger.update.url)
  @ApiOperation({
    summary: UserSwagger.update.summary,
    description: UserSwagger.update.description,
  })
  @ApiBody({ required: true })
  public async update(
    @Body() request: InfoUserRequest,
    @Param('id') id: number,
  ): Promise<CoreApiResponse<UserResponse>> {
    H3Logger.info('req :: PUT ::  update user');
    const response = await this._userService.update(id, request);
    H3Logger.info('req :: PUT ::  update user');
    return CoreApiResponse.success(response);
  }
}

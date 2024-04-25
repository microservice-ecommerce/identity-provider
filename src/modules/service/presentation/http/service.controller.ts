import { CoreApiResponse, H3Logger } from '@high3ar/common-api';
import { Body, Controller, Get, Inject, Param, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServiceRequest } from '@service/domain/dtos/requests';
import { IServiceUseCase } from '@service/domain/interfaces';
import { APP_SERVICE_SERVICE } from '@service/domain/token';
import { ServiceSwagger } from '../swagger';
import { ServiceResponse } from '@service/domain/dtos/responses';

@ApiTags(ServiceSwagger.tags)
@Controller(ServiceSwagger.prefix)
export class ServiceController {
  constructor(
    @Inject(APP_SERVICE_SERVICE)
    private readonly _appService: IServiceUseCase,
  ) {}

  @Post(ServiceSwagger.create.url)
  @ApiOperation({
    summary: ServiceSwagger.create.summary,
    description: ServiceSwagger.create.description,
  })
  @ApiBody({ type: ServiceRequest, required: true })
  public async create(@Body() request: ServiceRequest): Promise<CoreApiResponse<ServiceResponse>> {
    H3Logger.info('req :: POST ::  create service');
    const response = await this._appService.save(request);
    H3Logger.info('req :: POST ::  create service');
    return CoreApiResponse.success(response);
  }

  @Put(ServiceSwagger.update.url)
  @ApiOperation({
    summary: ServiceSwagger.update.summary,
    description: ServiceSwagger.update.description,
  })
  @ApiBody({ type: ServiceRequest, required: true })
  public async update(
    @Body() request: ServiceRequest,
    @Param('id') id: number,
  ): Promise<CoreApiResponse<ServiceResponse>> {
    H3Logger.info('req :: PUT ::  update service');
    const response = await this._appService.update(id, request);
    H3Logger.info('req :: PUT ::  update service');
    return CoreApiResponse.success(response);
  }

  @Get(ServiceSwagger.getOne.url)
  @ApiOperation({
    summary: ServiceSwagger.getOne.summary,
    description: ServiceSwagger.getOne.description,
  })
  public async getOne(@Param('id') id: number): Promise<CoreApiResponse<ServiceResponse>> {
    H3Logger.info(`req :: GET ::  service ${id}`);
    const response = await this._appService.getOne(id);
    H3Logger.info(`req :: GET ::  service ${id}`);
    return CoreApiResponse.success(response);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { ServiceModel } from '@service/domain/models';
import { plainToInstance } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class ServiceRequest {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'serviceName',
    description: 'service in infrastructures)',
    example: 'service order',
  })
  serviceName: string;

  @IsString()
  @ApiProperty({
    name: 'description',
    description: 'description of service',
    example: 'service order',
  })
  description: string;

  public static toModel(request: ServiceRequest): ServiceModel {
    return plainToInstance(ServiceModel, request);
  }
}

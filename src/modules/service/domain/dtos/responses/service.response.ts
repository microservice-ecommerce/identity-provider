import { ApiProperty } from '@nestjs/swagger';
import { ServiceModel } from '@service/domain/models';
import { plainToInstance } from 'class-transformer';

export class ServiceResponse {
  @ApiProperty({
    name: 'serviceName',
    description: 'service in infrastructures)',
    example: 'service order',
  })
  serviceName: string;

  @ApiProperty({
    name: 'description',
    description: 'description of service',
    example: 'service order',
  })
  description: string;

  public static toResponse(service: ServiceModel): ServiceResponse {
    return plainToInstance(ServiceResponse, service);
  }
}

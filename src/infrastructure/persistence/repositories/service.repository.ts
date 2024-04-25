import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceModel } from '@service/domain/models';
import { IServicePort } from '@service/domain/ports';
import { BaseAbstractRepository } from '@shared/infrastructure/repositories/base.repository';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { ServiceEntity } from '../mappers';

@Injectable()
export class ServiceRepository extends BaseAbstractRepository<ServiceEntity, ServiceModel> implements IServicePort {
  constructor(
    @InjectRepository(ServiceEntity)
    private readonly _serviceRepository: Repository<ServiceEntity>,
  ) {
    super(_serviceRepository);
  }

  public toModel(entity: ServiceEntity): ServiceModel {
    return {
      id: entity.id,
      serviceName: entity.serviceName,
      description: entity.description,
      createdDate: entity.createdDate,
      modifiedDate: entity.modifiedDate,
    } as ServiceModel;
  }

  public toEntity(model: ServiceModel): ServiceEntity {
    return plainToClass(ServiceEntity, model);
  }
}

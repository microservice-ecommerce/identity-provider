import { ServiceEntity } from '@infrastructure/persistence/mappers';
import { BaseInterfaceRepository } from '@shared/infrastructure/repositories/base.interface';
import { ServiceModel } from '../models';

export interface IServicePort extends BaseInterfaceRepository<ServiceEntity, ServiceModel> {}

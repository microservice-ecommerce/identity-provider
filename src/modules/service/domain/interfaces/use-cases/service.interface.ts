import { ServiceRequest } from '@service/domain/dtos/requests';
import { ServiceResponse } from '@service/domain/dtos/responses';

export interface IServiceUseCase {
  save(request: ServiceRequest): Promise<ServiceResponse>;

  getOne(serviceId: number): Promise<ServiceResponse>;

  update(id: number, request: ServiceRequest): Promise<ServiceResponse>;
}

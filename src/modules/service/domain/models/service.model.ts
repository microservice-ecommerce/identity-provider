import { AuditModelSoftDelete } from '@shared/domain/models';
import { IService } from '../interfaces/models';

export class ServiceModel extends AuditModelSoftDelete implements IService {
  id?: number;
  serviceName: string;
  description?: string;

  constructor(serviceName: string, description: string, createdAt: Date, modifiedDate: Date) {
    super(createdAt);
    this.serviceName = serviceName;
    this.description = description;
  }
}

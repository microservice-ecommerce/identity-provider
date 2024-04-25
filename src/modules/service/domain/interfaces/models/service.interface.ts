import { IAuditSoftDeleteBase } from '@shared/domain/interfaces';

export interface IService extends IAuditSoftDeleteBase {
  id?: number;
  serviceName: string;
  description?: string;
}

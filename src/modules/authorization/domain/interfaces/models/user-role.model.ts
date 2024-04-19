import { IAuditBase } from '@shared/core/interfaces';
export interface IUserRole extends IAuditBase {
  id?: number;
  description?: string;
}

import { IAuditBase } from '@shared/core/interfaces';

export interface IPermissionModel extends IAuditBase {
  id?: number;
  description?: string;
}

import { IAuditBase } from '@shared/core/interfaces';
import { IRoleToPermission } from './role-to-permission.interface';

export interface IPermission extends IAuditBase {
  id?: number;
  description?: string;
  roleToPermission: IRoleToPermission[];
}

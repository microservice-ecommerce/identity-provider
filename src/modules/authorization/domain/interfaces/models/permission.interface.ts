import { IAuditBase } from '@shared/domain/interfaces';
import { IRoleToPermission } from './role-to-permission.interface';

export interface IPermission extends IAuditBase {
  id?: number;
  description?: string;
  roleToPermission: IRoleToPermission[];
}

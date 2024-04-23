import { IAuditBase } from '@shared/core/interfaces';
import { IPermission } from './permission.interface';
import { IRole } from './role.interface';
export interface IRoleToPermission extends IAuditBase {
  id?: number;
  role: IRole;
  permission: IPermission;
}

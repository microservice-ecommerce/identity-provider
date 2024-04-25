import { IAuditBase } from '@shared/domain/interfaces';
import { IPermission } from './permission.interface';
import { IRole } from './role.interface';
export interface IRoleToPermission extends IAuditBase {
  id?: number;
  role: IRole;
  permission: IPermission;
}

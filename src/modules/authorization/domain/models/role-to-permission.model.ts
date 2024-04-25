import { AuditModelBase } from '@shared/domain/models';
import { IPermission, IRole, IRoleToPermission } from '../interfaces';

export class RoleToPermissionModel extends AuditModelBase implements IRoleToPermission {
  id?: number;
  permission: IPermission;
  role: IRole;
}

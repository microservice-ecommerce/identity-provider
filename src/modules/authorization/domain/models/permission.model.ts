import { AuditModelBase } from '@shared/core/models';
import { IPermission } from '../interfaces';
import { RoleToPermissionModel } from './role-to-permission.model';

export class PermissionModel extends AuditModelBase implements IPermission {
  id?: number;
  permissionDescription?: string;
  roleToPermission: RoleToPermissionModel[];
}

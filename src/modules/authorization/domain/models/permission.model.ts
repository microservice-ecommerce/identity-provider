import { AuditModelBase } from '@shared/domain/models';
import { IPermission } from '../interfaces';
import { RoleToPermissionModel } from './role-to-permission.model';

export class PermissionModel extends AuditModelBase implements IPermission {
  id?: number;
  permissionDescription?: string;
  roleToPermission: RoleToPermissionModel[];
}

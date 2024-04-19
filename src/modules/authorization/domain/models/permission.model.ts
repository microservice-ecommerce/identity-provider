import { AuditModelBase } from '@shared/core/models';
import { IPermissionModel } from '../interfaces';

export class PermissionModel extends AuditModelBase implements IPermissionModel {
  id?: number;
  permissionDescription?: string;
}

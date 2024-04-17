import { BaseAuditModel } from '@shared/core/models';
import { IPermissionModel } from '../interfaces';

export class PermissionModel extends BaseAuditModel implements IPermissionModel {
  id?: number;
  permissionDescription?: string;
}

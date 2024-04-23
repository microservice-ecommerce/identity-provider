import { AuditModelBase } from '@shared/core/models';
import { IRole } from '../interfaces';
import { UserToRoleModel } from './user-to-role.model';

export class RoleModel extends AuditModelBase implements IRole {
  id?: number;
  roleDescription?: string;
  userToRole: UserToRoleModel[];
}

import { AuditModelBase } from '@shared/domain/models';
import { IRole } from '../interfaces';
import { UserToRoleModel } from './user-to-role.model';

export class RoleModel extends AuditModelBase implements IRole {
  id?: number;
  roleDescription?: string;
  userToRole: UserToRoleModel[];
}

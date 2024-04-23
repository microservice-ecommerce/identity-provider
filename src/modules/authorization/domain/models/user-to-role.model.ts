import { AuditModelBase } from '@shared/core/models';
import { IUser } from '@user/domain/interfaces';
import { IRole, IUserToRole } from '../interfaces';

export class UserToRoleModel extends AuditModelBase implements IUserToRole {
  id?: number;
  user: IUser;
  role: IRole;
}

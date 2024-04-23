import { IAuditBase } from '@shared/core/interfaces';
import { IUserToRole } from './account-to-role.interface';
export interface IRole extends IAuditBase {
  id?: number;
  description?: string;
  userToRole: IUserToRole[];
}

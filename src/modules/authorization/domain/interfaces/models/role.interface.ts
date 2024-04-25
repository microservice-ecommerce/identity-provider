import { IAuditBase } from '@shared/domain/interfaces';
import { IUserToRole } from './account-to-role.interface';
export interface IRole extends IAuditBase {
  id?: number;
  description?: string;
  userToRole: IUserToRole[];
}

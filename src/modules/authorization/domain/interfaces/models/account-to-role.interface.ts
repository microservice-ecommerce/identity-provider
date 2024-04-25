import { IAuditBase } from '@shared/domain/interfaces';
import { IUser } from '@user/domain/interfaces';
import { IRole } from './role.interface';
export interface IUserToRole extends IAuditBase {
  id?: number;
  user: IUser;
  role: IRole;
}

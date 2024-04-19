import { AuditModelBase } from '@shared/core/models';
import { IUserRole } from '../interfaces';

export class UserRole extends AuditModelBase implements IUserRole {
  id?: number;
  roleDescription?: string;
}

import { BaseAuditModel } from '@shared/core/models';
import { IUserRole } from '../interfaces';

export class UserRole extends BaseAuditModel implements IUserRole {
  id?: number;
  roleDescription?: string;
}

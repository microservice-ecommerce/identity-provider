import { IAuditSoftDeleteBase } from '../interfaces';

export abstract class AuditModelSoftDelete implements IAuditSoftDeleteBase {
  deletedAt: Date;

  constructor(deletedAt: Date) {
    this.deletedAt = deletedAt;
  }
}

import { IBase } from '@high3ar/common-api';

export interface IAuditBase extends IBase {}

export interface IAuditSoftDeleteBase extends IBase {
  deletedAt?: Date;
}

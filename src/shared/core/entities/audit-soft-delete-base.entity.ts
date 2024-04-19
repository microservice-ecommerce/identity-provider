import { BaseEntity } from '@high3ar/common-api';
import { DeleteDateColumn } from 'typeorm';
import { IAuditSoftDeleteBase } from '../interfaces';
import { DatabaseColumn } from '../constants/database.constant';
export abstract class AuditSoftDeleteBaseEntity extends BaseEntity implements IAuditSoftDeleteBase {
  @DeleteDateColumn({ name: DatabaseColumn.DELETE_AT })
  public deletedAt: Date;
}

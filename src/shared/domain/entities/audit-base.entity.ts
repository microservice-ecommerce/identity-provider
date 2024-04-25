import { BaseEntity } from '@high3ar/common-api';
import { IAuditBase } from '../interfaces';
export abstract class AuditBaseEntity extends BaseEntity implements IAuditBase {}

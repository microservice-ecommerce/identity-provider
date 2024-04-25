import { IAuditBase } from '../interfaces/audit.interface';
import { BaseModel } from '@high3ar/common-api';
export abstract class AuditModelBase extends BaseModel implements IAuditBase {}

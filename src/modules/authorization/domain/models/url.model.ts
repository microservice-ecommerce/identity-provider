import { AuditModelBase } from '@shared/core/models';
import { IURL } from '../interfaces';

export class URLModel extends AuditModelBase implements IURL {
  id?: number;
  urlPath?: string;
}

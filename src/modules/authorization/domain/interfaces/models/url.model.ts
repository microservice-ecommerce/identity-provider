import { IAuditBase } from '@shared/core/interfaces';
export interface IURL extends IAuditBase {
  id?: number;
  urlPath?: string;
}

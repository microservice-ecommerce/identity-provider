import { DatabaseColumn } from '../constants/database.constant';

interface IBaseAuditModel {
  createdDate?: Date;
  modifiedDate?: Date;
}
export abstract class BaseAuditModel implements IBaseAuditModel {
  createdDate: Date;

  modifiedDate: Date;

  constructor(createdDate: Date, modifiedDate: Date) {
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
  }
}

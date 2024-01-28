import { IModelBase } from '@high3ar/common-api';
import { BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { DatabaseColumn } from '../constants/database.constant';

export abstract class BaseModel implements IModelBase {
  createdDate: Date;

  modifiedDate: Date;

  constructor(createdDate: Date, modifiedDate: Date) {
    this.createdDate = createdDate;
    this.modifiedDate = modifiedDate;
  }
}

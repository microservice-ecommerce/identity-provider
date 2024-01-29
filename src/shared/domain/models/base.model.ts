import { IModelBase } from '@high3ar/common-api';

export abstract class BaseModel implements IModelBase {
  createdDate: Date;

  modifiedDate: Date;
}

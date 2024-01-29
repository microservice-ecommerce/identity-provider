import { BaseModel } from '@shared/domain/models';
import { IEmailValidationStatus } from '../interfaces';

export class EmailValidationStatusModel extends BaseModel implements IEmailValidationStatus {
  id?: number;
  statusDescription: string;

  constructor(props: IEmailValidationStatus) {
    super();
    Object.assign(this, props);
  }
}

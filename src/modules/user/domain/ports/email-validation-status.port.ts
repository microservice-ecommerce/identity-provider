import { EmailValidationStatusEntity } from '@infrastructure/persistence/mappers';
import { BaseInterfaceRepository } from '@shared/repositories/base.interface';
import { EmailValidationStatusModel } from '../models';

export interface IEmailValidationStatusPort
  extends BaseInterfaceRepository<EmailValidationStatusEntity, EmailValidationStatusModel> {}

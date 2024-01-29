import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseAbstractRepository } from '@shared/repositories/base.repository';
import { EmailValidationStatusModel } from '@user/domain/models';
import { IEmailValidationStatusPort } from '@user/domain/ports';
import { Repository } from 'typeorm';
import { EmailValidationStatusEntity } from '../mappers';

@Injectable()
export class EmailValidationStatusRepository
  extends BaseAbstractRepository<EmailValidationStatusEntity, EmailValidationStatusModel>
  implements IEmailValidationStatusPort
{
  constructor(
    @InjectRepository(EmailValidationStatusEntity)
    private readonly _emailValidationStatusRepository: Repository<EmailValidationStatusEntity>,
  ) {
    super(_emailValidationStatusRepository);
  }

  public toModel(entity: EmailValidationStatusEntity): EmailValidationStatusModel {
    return {
      id: entity.id,
      statusDescription: entity.statusDescription,
    } as EmailValidationStatusModel;
  }

  public toEntity(model: EmailValidationStatusModel): EmailValidationStatusEntity {
    const object = {
      id: model.id,
      statusDescription: model.statusDescription,
    };
    return new EmailValidationStatusEntity(object);
  }
}

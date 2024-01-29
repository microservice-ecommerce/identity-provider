import { ModelBaseEntity } from '@shared/domain/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IEmailValidationStatus } from '../../../modules/user/domain/interfaces';
import { DatabaseColumn } from '../../../shared/domain/constants/database.constant';
import { TableName } from '../../../shared/domain/constants/table-name.constant';
@Entity(TableName.EMAIL_VALIDATION_STATUS)
export class EmailValidationStatusEntity extends ModelBaseEntity implements IEmailValidationStatus {
  constructor(props: IEmailValidationStatus) {
    super();
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn({ name: DatabaseColumn.ID_ACCOUNT })
  id: number;

  @Column({ name: DatabaseColumn.STATUS_DESCRIPTION, length: 20 })
  statusDescription: string;
}

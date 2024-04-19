import { IUserRole } from '@authorization/domain/interfaces';
import { DatabaseColumn } from '@shared/core/constants/database.constant';
import { TableName } from '@shared/core/constants/table-name.constant';
import { AuditBaseEntity } from '@shared/core/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity(TableName.USER_ROLE)
export class UserRole extends AuditBaseEntity implements IUserRole {
  constructor(props: IUserRole) {
    super();
    Object.assign(this, props);
  }
  @PrimaryGeneratedColumn({ name: DatabaseColumn.ID_PERMISSION })
  id: number;

  @Column({ name: DatabaseColumn.DESCRIPTION })
  description: string;
}

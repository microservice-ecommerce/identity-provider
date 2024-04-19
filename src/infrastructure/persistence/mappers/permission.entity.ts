import { IPermissionModel } from '@authorization/domain/interfaces';
import { DatabaseColumn } from '@shared/core/constants/database.constant';
import { AuditBaseEntity } from '@shared/core/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TableName } from '../../../shared/core/constants/table-name.constant';
@Entity(TableName.PERMISSION)
export class PermissionEntity extends AuditBaseEntity implements IPermissionModel {
  constructor(props: IPermissionModel) {
    super();
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn({ name: DatabaseColumn.ID_PERMISSION })
  id: number;

  @Column({ name: DatabaseColumn.DESCRIPTION })
  description: string;
}
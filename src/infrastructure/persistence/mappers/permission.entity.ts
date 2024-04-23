import { IPermission } from '@authorization/domain/interfaces';
import { ColumnName } from '@shared/core/constants/database.constant';
import { AuditBaseEntity } from '@shared/core/entities';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TableName } from '../../../shared/core/constants/table-name.constant';
import { RoleEntity } from './role.entity';
import { RoleToPermissionEntity } from './role-to-permission.entity';
@Entity(TableName.PERMISSION)
export class PermissionEntity extends AuditBaseEntity implements IPermission {
  constructor(props: IPermission) {
    super();
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn({ name: ColumnName.ID_PERMISSION })
  id: number;

  @Column({ name: ColumnName.DESCRIPTION })
  description: string;

  @OneToMany(() => RoleToPermissionEntity, (roleToPermission) => roleToPermission.permission)
  roleToPermission: RoleToPermissionEntity[];
}

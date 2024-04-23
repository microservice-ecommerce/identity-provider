import { IRoleToPermission } from '@authorization/domain/interfaces';
import { ColumnName } from '@shared/core/constants/database.constant';
import { TableName } from '@shared/core/constants/table-name.constant';
import { AuditBaseEntity } from '@shared/core/entities';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PermissionEntity } from './permission.entity';
import { RoleEntity } from './role.entity';

@Entity(TableName.ROLE_TO_PERMISSION)
export class RoleToPermissionEntity extends AuditBaseEntity implements IRoleToPermission {
  constructor(props: IRoleToPermission) {
    super();
    Object.assign(this, props);
  }
  @PrimaryGeneratedColumn({ name: ColumnName.ID_ROLE_TO_PERMISSION })
  id: number;

  @ManyToOne(() => PermissionEntity, (permission) => permission)
  @JoinColumn({ name: ColumnName.ID_PERMISSION })
  permission: PermissionEntity;

  @ManyToOne(() => RoleEntity, (role) => role.roleToPermission)
  @JoinColumn({ name: ColumnName.ID_ROLE })
  role: RoleEntity;
}

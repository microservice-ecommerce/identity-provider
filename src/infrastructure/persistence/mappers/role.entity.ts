import { IRole } from '@authorization/domain/interfaces';
import { ColumnName } from '@shared/domain/constants/database.constant';
import { TableName } from '@shared/domain/constants/table-name.constant';
import { AuditBaseEntity } from '@shared/domain/entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoleToPermissionEntity } from './role-to-permission.entity';
import { UserToRoleEntity } from './user-to-role.entity';

@Entity(TableName.ROLE)
export class RoleEntity extends AuditBaseEntity implements IRole {
  constructor(props: IRole) {
    super();
    Object.assign(this, props);
  }
  @PrimaryGeneratedColumn({ name: ColumnName.ID_PERMISSION })
  id: number;

  @Column({ name: ColumnName.DESCRIPTION })
  description: string;

  @OneToMany(() => UserToRoleEntity, (userToRole) => userToRole.role)
  userToRole: UserToRoleEntity[];

  @OneToMany(() => RoleToPermissionEntity, (roleToPermission) => roleToPermission.role)
  roleToPermission: RoleToPermissionEntity[];
}

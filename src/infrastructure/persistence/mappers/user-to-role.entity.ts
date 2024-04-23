import { IUserToRole } from '@authorization/domain/interfaces';
import { ColumnName } from '@shared/core/constants/database.constant';
import { TableName } from '@shared/core/constants/table-name.constant';
import { AuditBaseEntity } from '@shared/core/entities';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';

@Entity(TableName.USER_TO_ROLE)
export class UserToRoleEntity extends AuditBaseEntity implements IUserToRole {
  constructor(props: IUserToRole) {
    super();
    Object.assign(this, props);
  }
  @PrimaryGeneratedColumn({ name: ColumnName.ID_USER_TO_ROLE })
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.userToRole)
  @JoinColumn({ name: ColumnName.ID_USER })
  user: UserEntity;

  @ManyToOne(() => RoleEntity, (role) => role.userToRole)
  @JoinColumn({ name: ColumnName.ID_ROLE })
  role: RoleEntity;
}

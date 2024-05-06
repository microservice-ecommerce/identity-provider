import { AuditSoftDeleteBaseEntity } from '@shared/domain/entities';
import { IUser } from '@user/domain/interfaces';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ColumnName } from '../../../shared/domain/constants/database.constant';
import { TableName } from '../../../shared/domain/constants/table-name.constant';
import { AccountEntity } from './account.entity';
@Entity(TableName.USER)
export class UserEntity extends AuditSoftDeleteBaseEntity implements IUser {
  constructor(props: IUser) {
    super();
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn({ name: ColumnName.ID_USER })
  id: number;

  @OneToOne(() => AccountEntity, (account) => account.user)
  @JoinColumn({ name: ColumnName.ID_USER })
  account: AccountEntity;

  @Column({ name: ColumnName.NAME })
  name: string;

  @Column({ name: ColumnName.PHONE_NUMBER })
  phoneNumber: string;

  @Column({ name: ColumnName.DATE_OF_BIRTH })
  dateOfBirth: Date;

  @Column({ name: ColumnName.GENDER })
  gender: boolean;

  @Column({ name: ColumnName.ADDRESS })
  address: string;
}

import { ModelBaseEntity } from '@shared/domain/entities';
import { IInfoUser } from '@user/domain/interfaces';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InfoUserRequest } from '../../../modules/user/domain/dtos';
import { DatabaseColumn } from '../../../shared/domain/constants/database.constant';
import { TableName } from '../../../shared/domain/constants/table-name.constant';
import { AccountEntity } from './account.entity';
@Entity(TableName.INFO_USER)
export class InfoUserEntity extends ModelBaseEntity implements IInfoUser {
  constructor(props: IInfoUser) {
    super();
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn({ name: DatabaseColumn.ID_USER })
  id: number;

  @OneToOne(() => AccountEntity, (account) => account.user)
  @JoinColumn({ name: DatabaseColumn.ID_ACCOUNT })
  account: AccountEntity;

  @Column({ name: DatabaseColumn.NAME })
  name: string;

  @Column({ name: DatabaseColumn.PHONE_NUMBER })
  phoneNumber: string;

  @Column({ name: DatabaseColumn.DATE_OF_BIRTH })
  dateOfBirth: Date;

  @Column({ name: DatabaseColumn.GENDER })
  gender: boolean;

  @Column({ name: DatabaseColumn.ADDRESS })
  address: string;

  @Column({ length: 100, nullable: true })
  confirmationToken: string | null;
}

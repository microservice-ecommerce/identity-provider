import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ModelBaseEntity } from "../../../../shared/core";
import { DatabaseColumn } from "../../../../shared/core/constants/database.constant";
import { TableName } from "../../../../shared/core/constants/table-name.constant";
import { IUser } from "../interfaces";
import { AccountEntity } from "./account.entity";
@Entity(TableName.USER)
export class UserEntity extends ModelBaseEntity {
  constructor(props: IUser) {
    super();
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn({ name: DatabaseColumn.ID_ACCOUNT })
  id: number;

  @OneToOne(() => AccountEntity, (account) => account.user)
  @JoinColumn({ name: DatabaseColumn.ID_ACCOUNT })
  account: AccountEntity

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
}

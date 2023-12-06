import { Column, Entity, PrimaryGeneratedColumn, Unique} from "typeorm";
import { DatabaseColumn } from "../../../../shared/core/constants/database.constant";
import { TableName } from "../../../../shared/core/constants/name-table.constant";
import { IAccount } from "../interfaces";
import { ModelBaseEntity } from "../../../../shared/core";
@Entity(TableName.ACCOUNT)
export class AccountEntity extends ModelBaseEntity {
  constructor(props: IAccount) {
    super();
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn({ name: DatabaseColumn.ID_ACCOUNT })
  id: number;

  @Unique(['email'])
  @Column({ name: DatabaseColumn.EMAIL })
  email: string;

  @Column({ name: DatabaseColumn.PASSWORD })
  password: string;

  @Column({ name: DatabaseColumn.SALT })
  salt: string;

  @Column({ name: DatabaseColumn.LAST_LOGIN_IP })
  lastLoginIp: string;

  @Column({ name: DatabaseColumn.PASSWORD_CHANGED })
  passwordChanged: Date;

  @Column({ name: DatabaseColumn.LAST_LOGIN })
  lastLogin: Date;
}

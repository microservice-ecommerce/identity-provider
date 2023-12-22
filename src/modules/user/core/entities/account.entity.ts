import { BeforeInsert, Column, Entity, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { DatabaseColumn } from "../../../../shared/core/constants/database.constant";
import { TableName } from "../../../../shared/core/constants/table-name.constant";
import { IAccount } from "../interfaces";
import { InfoUserEntity } from "./info-user.entity";
import * as bcrypt from 'bcrypt';
import { ModelBaseEntity } from "@high3ar/common-api";
@Entity(TableName.ACCOUNT)
export class AccountEntity extends ModelBaseEntity {
  constructor(props: IAccount) {
    super();
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn({ name: DatabaseColumn.ID_ACCOUNT })
  id: number;

  @OneToOne(() => InfoUserEntity, (user) => user.account, { eager: true })
  user?: InfoUserEntity;

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

  @BeforeInsert()
  public async hashPassword() {
    this.salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, this.salt);
  }
}

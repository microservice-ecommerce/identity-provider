import { AuditSoftDeleteBaseEntity } from '@shared/core/entities';
import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IAccount } from '@user/domain/interfaces';
import { DatabaseColumn } from '@shared/core/constants/database.constant';
import { TableName } from '@shared/core/constants/table-name.constant';
import { InfoUserEntity } from './info-user.entity';
@Entity(TableName.ACCOUNT)
export class AccountEntity extends AuditSoftDeleteBaseEntity implements IAccount {
  constructor(props: IAccount) {
    super();
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn({ name: DatabaseColumn.ID_USER })
  id: number;

  @OneToOne(() => InfoUserEntity, (user) => user.account, { eager: true })
  user: InfoUserEntity;

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

  update(lastLoginIp: string) {
    this.lastLoginIp = lastLoginIp;
    this.lastLogin = new Date();
  }
}

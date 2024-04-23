import { ColumnName } from '@shared/core/constants/database.constant';
import { TableName } from '@shared/core/constants/table-name.constant';
import { AuditSoftDeleteBaseEntity } from '@shared/core/entities';
import { IAccount, IUser } from '@user/domain/interfaces';
import * as bcrypt from 'bcrypt';
import { BeforeInsert, Column, Entity, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { UserEntity } from './user.entity';
@Entity(TableName.ACCOUNT)
export class AccountEntity extends AuditSoftDeleteBaseEntity implements IAccount {
  constructor(props: IAccount) {
    super();
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn({ name: ColumnName.ID_USER })
  id: number;

  @OneToOne(() => UserEntity, (user) => user.account, { eager: true })
  user: IUser;

  @Unique(['email'])
  @Column({ name: ColumnName.EMAIL })
  email: string;

  @Column({ name: ColumnName.PASSWORD })
  password: string;

  @Column({ name: ColumnName.SALT })
  salt: string;

  @Column({ name: ColumnName.LAST_LOGIN_IP })
  lastLoginIp: string;

  @Column({ name: ColumnName.PASSWORD_CHANGED })
  passwordChanged: Date;

  @Column({ name: ColumnName.LAST_LOGIN })
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

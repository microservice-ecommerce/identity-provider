import { BeforeInsert, Column, Entity, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { DatabaseColumn } from '../../../shared/domain/constants/database.constant';
import { TableName } from '../../../shared/domain/constants/table-name.constant';
import { IAccount } from '../../../modules/user/domain/interfaces';
import { InfoUserEntity } from './info-user.entity';
import * as bcrypt from 'bcrypt';
import { ModelBaseEntity } from '@shared/domain/entities';
@Entity(TableName.ACCOUNT)
export class AccountEntity extends ModelBaseEntity implements IAccount {
  constructor(props: IAccount) {
    super();
    Object.assign(this, props);
  }

  @PrimaryGeneratedColumn({ name: DatabaseColumn.ID_ACCOUNT })
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

  @Column({ name: DatabaseColumn.CONFIRMATION_TOKEN, length: 100, nullable: true })
  confirmationToken: string;

  @Column({ name: DatabaseColumn.TOKEN_GENERATION_TIME, nullable: true })
  tokenGenerationTime: Date;

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

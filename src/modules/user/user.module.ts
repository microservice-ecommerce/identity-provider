import { Module } from '@nestjs/common';
import { UserController } from './presentation';
import { UserService } from './application/services/user.service';
import { ACCOUNT_REPOSITORY, USER_REPOSITORY, USER_SERVICE } from './core/token';
import { UserRepository,AccountRepository } from './infrastructure';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity, InfoUserEntity } from './core/entities';

const providers = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
  {
    provide: ACCOUNT_REPOSITORY,
    useClass: AccountRepository,
  },
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository
  }
]

@Module({
  imports: [TypeOrmModule.forFeature([InfoUserEntity,AccountEntity])],
  controllers: [UserController],
  providers: [...providers],
})
export class UserModule {}

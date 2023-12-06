import { Module } from '@nestjs/common';
import { UserController } from './presentation';
import { UserService } from './application/services/user.service';
import { ACCOUNT_REPOSITORY, USER_REPOSITORY, USER_SERVICE } from './core/token';
import { UserRepository,AccountRepository } from './infrastructure';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity, UserEntity } from './core/entities';

const providers = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  }
]

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity,AccountEntity, AccountRepository])],
  controllers: [UserController],
  providers: [...providers],
})
export class UserModule {}

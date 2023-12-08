import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '@user/application';
import { AccountEntity, InfoUserEntity } from '../user/core/entities';
import { ACCOUNT_REPOSITORY, USER_REPOSITORY, USER_SERVICE } from '../user/core/token';
import { AccountRepository, UserRepository } from '../user/infrastructure';
import { AuthService } from './application';
import { AUTH_SERVICE } from './core';
import { AuthController } from './presentation';

const providers = [
  {
    provide: AUTH_SERVICE,
    useClass: AuthService,
  },
  {
    provide: ACCOUNT_REPOSITORY,
    useClass: AccountRepository,
  },
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository
  },
  {
    provide: USER_SERVICE,
    useClass: UserService
  }
]

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, InfoUserEntity])],
  controllers: [AuthController],
  providers: [...providers],
})
export class AuthModule {}

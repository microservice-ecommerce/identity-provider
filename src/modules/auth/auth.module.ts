import { Module } from '@nestjs/common';
import { AUTH_REPOSITORY, AUTH_SERVICE, AccountEntity } from './core';
import { AuthService } from './application';
import { AuthController } from './presentation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository, UserRepository } from '../user/infrastructure';
import { ACCOUNT_REPOSITORY, USER_REPOSITORY } from '../user/core/token';
import { UserEntity } from '../user/core/entities';

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
  }
]

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, UserEntity])],
  controllers: [AuthController],
  providers: [...providers],
})
export class AuthModule {}

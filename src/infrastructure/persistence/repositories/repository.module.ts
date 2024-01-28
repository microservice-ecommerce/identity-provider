import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity, InfoUserEntity } from '@infrastructure/persistence/mappers';
import { ACCOUNT_REPOSITORY, USER_REPOSITORY } from '@user/domain/token';
import { AccountRepository } from './account.repository';
import { UserRepository } from './user.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, InfoUserEntity])],
  providers: [
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: AccountRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
  exports: [ACCOUNT_REPOSITORY, USER_REPOSITORY],
})
export class RepositoryModule {}

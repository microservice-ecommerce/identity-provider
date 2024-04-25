import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity, ServiceEntity, UserEntity } from '@infrastructure/persistence/mappers';
import { ACCOUNT_REPOSITORY, USER_REPOSITORY } from '@user/domain/token';
import { AccountRepository } from './account.repository';
import { UserRepository } from './user.repository';
import { APP_SERVICE_REPOSITORY } from '@service/domain/token';
import { ServiceRepository } from './service.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, UserEntity, ServiceEntity])],
  providers: [
    {
      provide: ACCOUNT_REPOSITORY,
      useClass: AccountRepository,
    },
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: APP_SERVICE_REPOSITORY,
      useClass: ServiceRepository,
    },
  ],
  exports: [ACCOUNT_REPOSITORY, USER_REPOSITORY, APP_SERVICE_REPOSITORY],
})
export class RepositoryModule {}

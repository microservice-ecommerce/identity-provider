import { TypeOrmModule } from "@nestjs/typeorm";
import TypeOrmConfig from "../configuration/type-orm.config";
import { Module } from "@nestjs/common";
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { RepositoryModule } from './repositories/repository.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return TypeOrmConfig;
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    RepositoryModule
  ],

})
export class PersistenceModule {}

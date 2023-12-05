import { TypeOrmModule } from "@nestjs/typeorm";
import TypeOrmConfig from "../../config/type-orm.config";
import { Module } from "@nestjs/common";


@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig)
  ],
})
export class PersistenceModule {}

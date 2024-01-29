import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { IdentityProviderConfig } from './identity-provider.config';
import { join } from 'path';

const TypeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: IdentityProviderConfig.DB_HOST,
  port: Number(IdentityProviderConfig.DB_PORT),
  username: IdentityProviderConfig.DB_USERNAME,
  password: IdentityProviderConfig.DB_PASSWORD,
  database: IdentityProviderConfig.DB_NAME,
  entities: [join(__dirname, '../**/mappers/**.entity.js')],
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
};
export default TypeOrmConfig;

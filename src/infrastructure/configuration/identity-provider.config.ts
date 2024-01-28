import { IsIn, IsInt, IsString, isString, validateSync } from 'class-validator';
export class Configuration {
  constructor(isExtends?: boolean) {
    if (isExtends) return;
    const error = validateSync(this);
    if (!error.length) return;
    process.exit(1);
  }

  @IsString()
  readonly HOST = 'localhost';

  @IsInt()
  readonly PORT = Number(3002);

  @IsInt()
  readonly REDIS_PORT = parseInt(process.env['REDIS_PORT'] ?? '6378');

  @IsString()
  readonly REDIS_HOST = process.env['REDIS_HOST'] ?? 'localhost';

  @IsString()
  readonly REDIS_PASSWORD = process.env['REDIS_PASSWORD'] ?? '1234';

  @IsInt()
  readonly REDIS_TTL = Number('100');

  @IsString()
  readonly IO_REDIS_KEY = 'IORedis';

  @IsInt()
  readonly DB_PORT = parseInt(process.env['DB_PORT'] ?? '3306');

  @IsString()
  readonly DB_NAME = process.env['DB_NAME'] ?? 'H3IdentityProviderDB';

  @IsString()
  readonly DB_PASSWORD = process.env['DB_PASSWORD'] ?? '123@';

  @IsString()
  readonly DB_USERNAME = process.env['DB_USERNAME'] ?? 'root';

  @IsString()
  readonly DB_HOST = process.env['DB_HOST'] ?? 'localhost';

  @IsString()
  readonly NODE_ENV = process.env['NODE_ENV'] ?? 'development';

  @IsInt()
  readonly ACCESS_TOKEN_EXPIRED = Number(process.env['ACCESS_TOKEN_EXPIRED'] ?? '1');

  @IsInt()
  readonly REFRESH_TOKEN_EXPIRED = Number(process.env['REFRESH_TOKEN_EXPIRED'] ?? '2');

  @IsString()
  readonly TOKEN_CLAIM_AUD = 'https://highbar.club';

  @IsString()
  readonly TOKEN_CLAIM_ISS = 'https://highbar.club';

  @IsString()
  readonly TOKEN_SECRET_KEY = 'c826e4b81193e607e1e6561087ca1405c9a0d3336fa6956a3d9ff07ea19c3878'; // highbar.club

  @IsString()
  readonly GLOBAL_PREFIX_API = 'api';

  @IsString()
  readonly ACCESS_LOG_DIR = './logs/action';

  @IsString()
  readonly ACTION_LOG_DIR = './logs/action';

  @IsString()
  readonly APPLICATION_LOG_DIR = './logs/application';

  @IsString()
  readonly AUDIT_LOG_DIR = './logs/audit';
}

export const IdentityProviderConfig = new Configuration();

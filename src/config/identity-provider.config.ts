import { IsInt, IsString, validateSync } from 'class-validator'
export class Configuration {
  constructor(isExtends?: boolean) {
    if (isExtends) return
    const error = validateSync(this)
    if (!error.length) return
    process.exit(1)
  }

  @IsString()
  readonly HOST = 'localhost'

  @IsInt()
  readonly PORT = Number(3002)

  @IsInt()
  readonly REDIS_PORT = parseInt(process.env['REDIS_PORT'] ?? '6379')

  @IsString()
  readonly REDIS_HOST = process.env['REDIS_HOST'] ?? 'localhost'

  @IsString()
  readonly REDIS_PASSWORD = process.env['REDIS_PASSWORD'] ?? '1234'

  @IsInt()
  readonly REDIS_TTL = Number('100')

  @IsString()
  readonly IO_REDIS_KEY = 'IORedis'


  @IsInt()
  readonly DB_PORT = parseInt(process.env['DB_PORT'] ?? '3306')

  @IsString()
  readonly DB_NAME = process.env['DB_NAME'] ?? 'H3IdentityProviderDB'

  @IsString()
  readonly DB_PASSWORD = process.env['DB_PASSWORD'] ?? '123@'

  @IsString()
  readonly DB_USERNAME = process.env['DB_USERNAME'] ?? 'root'

  @IsString()
  readonly DB_HOST = process.env['DB_HOST'] ?? 'localhost'

  @IsString()
  readonly NODE_ENV = process.env['NODE_ENV'] ?? 'development'

  @IsString()
  readonly GLOBAL_PREFIX_API = 'api'
}


export const IdentityProviderConfig = new Configuration()

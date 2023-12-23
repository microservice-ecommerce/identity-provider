import { Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { IdentityProviderConfig } from 'src/infrastructure/configuration/identity-provider.config';
import { KeyType } from '../core/enums/key-type.enum';
import { CacheExpired } from '@shared/core/constants/cache-expired.constant';

export class CacheService {
  constructor(
    @Inject(IdentityProviderConfig.IO_REDIS_KEY)
    private readonly _redisManager: Redis,
  ) {}

  public getKey(keyType: KeyType, key: string): string {
    switch (keyType) {
      case KeyType.REFRESH_TOKEN:
        return `highbar:bl:${keyType}:${key}`;
      default:
        return key;
    }
  }

  public getExpired(keyType: KeyType): number {
    switch (keyType) {
      case KeyType.REFRESH_TOKEN:
        return CacheExpired.REFRESH_TOKEN;
      default:
        return 0;
    }
  }

  public set(key: string, value: string, expired: number): Promise<string> {
    return this._redisManager.set(key, value, 'EX', expired);
  }

  public get(key: string): Promise<string> {
    return this._redisManager.get(key);
  }
}

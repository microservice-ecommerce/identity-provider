import { Inject } from '@nestjs/common';
import Redis from 'ioredis';
import { IdentityProviderConfig } from 'src/infrastructure/configuration/identity-provider.config';
import { KeyType } from '../core/enums/key-type.enum';
import { CacheExpired } from '@shared/core/constants/cache-expired.constant';

export class CacheService {
  private _commands = ['BF.ADD', 'BF.EXISTS', 'BF.RESERVE'];
  cmds = {};
  constructor(
    @Inject(IdentityProviderConfig.IO_REDIS_KEY)
    private readonly _redisManager: Redis,
  ) {
    this._commands.forEach((command) => {
      const cmd = this._redisManager.createBuiltinCommand(command);
      this.cmds[command] = cmd.string;
      this.cmds[`${command}Buffer`] = cmd.buffer;
    });
  }

  public getKey(keyType: KeyType, key: string): string {
    switch (keyType) {
      case KeyType.REFRESH_TOKEN:
        return `highbar:bl:${keyType}:${key}`;
      case KeyType.ACCESS_TOKEN:
        return `highbar:bl:${keyType}:${key}`;
      default:
        return key;
    }
  }

  public getExpired(keyType: KeyType): number {
    switch (keyType) {
      case KeyType.REFRESH_TOKEN:
        return CacheExpired.REFRESH_TOKEN;
      case KeyType.ACCESS_TOKEN:
        return CacheExpired.ACCESS_TOKEN;
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

  public async addBL(key: string, value: string): Promise<number> {
    const cmd = this.cmds['BF.ADD'];
  
    console.log(`Adding key ${key} to bloom filter...`);
  
    const result = await cmd.call(this._redisManager, key, value);
  
    console.log(`Key ${key} added to bloom filter with result: ${result}`);
  
    return result;
  }

  public async existsBL(key: string, value: string): Promise<number> {
    const cmd = this.cmds['BF.EXISTS'];
  
    console.log(`Checking if key ${key} exists in bloom filter...`);
  
    const result = await cmd.call(this._redisManager, key, value);
  
    console.log(`Key ${key} exists in bloom filter: ${result}`);
  
    return result;
  }

  public async reserve(key: string, errRate: number, capacity: number): Promise<number> {
    const cmd = this.cmds['BF.RESERVE'];
  
    console.log(`Reserving key ${key} in bloom filter with error rate ${errRate} and capacity ${capacity}...`);
  
    const result = await cmd.call(this._redisManager, key, errRate, capacity);
  
    console.log(`Key ${key} reserved in bloom filter with result: ${result}`);
  
    return result;
  }
}

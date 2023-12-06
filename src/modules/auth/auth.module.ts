import { Module } from '@nestjs/common';
import { AUTH_REPOSITORY, AUTH_SERVICE, AccountEntity } from './core';
import { AuthService } from './application';
import { AuthController } from './presentation';
import { TypeOrmModule } from '@nestjs/typeorm';

const providers = [
  {
    provide: AUTH_SERVICE,
    useClass: AuthService,
  }
]

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [...providers],
})
export class AuthModule {}

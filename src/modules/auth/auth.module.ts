import { Module } from '@nestjs/common';
import { AUTH_REPOSITORY, AUTH_SERVICE } from './core';
import { AuthService } from './application';
import { AuthRepository } from './infrastructure';
import { AuthController } from './presentation';

const providers = [
  {
    provide: AUTH_SERVICE,
    useClass: AuthService,
  },
  {
    provide: AUTH_REPOSITORY,
    useClass: AuthRepository,
  },
]

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [...providers],
})
export class AuthModule {}

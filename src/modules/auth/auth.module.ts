import { Module } from '@nestjs/common';
import { AUTH_REPOSITORY, AUTH_SERVICE, AccountEntity } from './core';
import { AuthService } from './application';
import { AuthRepository } from './infrastructure';
import { AuthController } from './presentation';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  imports: [TypeOrmModule.forFeature([AccountEntity]) ],
  controllers: [AuthController],
  providers: [...providers],
})
export class AuthModule {}

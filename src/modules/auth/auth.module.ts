import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CacheService } from '@shared/services';
import { UserModule } from '../user/user.module';
import { AuthService } from './application';
import { AuthHelper } from './application/helpers';
import { AUTH_SERVICE } from './domain/token';
import { AuthController } from './presentation';

const providers = [
  {
    provide: AUTH_SERVICE,
    useClass: AuthService,
  },
  AuthHelper,
  CacheService,
];

@Module({
  imports: [UserModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [...providers],
})
export class AuthModule {}

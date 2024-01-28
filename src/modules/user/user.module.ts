import { Module } from '@nestjs/common';
import { UserService } from './application/services/user.service';
import { USER_SERVICE } from './domain/token';
import { UserController } from './presentation';

const providers = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
];

@Module({
  imports: [],
  controllers: [UserController],
  providers: [...providers],
  exports: [USER_SERVICE],
})
export class UserModule {}

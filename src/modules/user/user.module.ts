import { Module } from '@nestjs/common';
import { UserController } from './presentation';
import { UserService } from './application/user.service';
import { USER_REPOSITORY, USER_SERVICE } from './core/token';
import { UserRepository } from './infrastructure';

const providers = [
  {
    provide: USER_SERVICE,
    useClass: UserService,
  },
  {
    provide: USER_REPOSITORY,
    useClass: UserRepository,
  },
]

@Module({
  imports: [],
  controllers: [UserController],
  providers: [...providers],
})
export class UserModule {}

import { Module } from '@nestjs/common';

import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';
import { InfrastructureModule } from '@infrastructure/infrastructure.module';

const serviceModules = [AuthModule, UserModule];
@Module({
  imports: [InfrastructureModule, ...serviceModules],
})
export class RootModule {}

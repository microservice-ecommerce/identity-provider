import { Module } from '@nestjs/common';
import { ApServiceModule, AuthModule, UserModule } from '../../modules';

@Module({
  imports: [AuthModule, UserModule, ApServiceModule],
})
export class ServiceModule {}

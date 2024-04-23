import { Module } from '@nestjs/common';
import { AuthModule, UserModule } from '../../modules';

@Module({
  imports: [AuthModule, UserModule],
})
export class ServiceModule {}

import { Module } from '@nestjs/common'
import {  AuthModule, UserModule } from '../../modules/routes'


@Module({
  imports: [AuthModule, UserModule]
})
export class ServiceModule {}

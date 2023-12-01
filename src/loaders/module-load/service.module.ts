import { Module } from '@nestjs/common'
import { AppModule, UserModule } from '../../modules/routes'


@Module({
  imports: [AppModule, UserModule]
})
export class ServiceModule {}

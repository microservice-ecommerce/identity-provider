import { Module } from '@nestjs/common'

import { ServiceModule } from './service.module'
import { InfrastructureModule } from '../../infrastructure/infrastructure.module'

@Module({
  imports: [InfrastructureModule, ServiceModule]
})
export class RootModule {}

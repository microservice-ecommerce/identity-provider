import { Module } from '@nestjs/common';
import { AppService } from './application/services';
import { APP_SERVICE_SERVICE } from './domain/token';
import { ServiceController } from './presentation/http';

const providers = [
  {
    provide: APP_SERVICE_SERVICE,
    useClass: AppService,
  },
];

@Module({
  imports: [],
  controllers: [ServiceController],
  providers: [...providers],
  exports: [APP_SERVICE_SERVICE],
})
export class ApServiceModule {}

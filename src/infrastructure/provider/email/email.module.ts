import { Module } from '@nestjs/common';
import { EMAIL_SERVICE } from '@shared/domain/token';
import { EmailService } from './email.service';

@Module({
  imports: [],
  providers: [
    {
      provide: EMAIL_SERVICE,
      useClass: EmailService,
    },
  ],
  exports: [EMAIL_SERVICE],
})
export class EmailModule {}

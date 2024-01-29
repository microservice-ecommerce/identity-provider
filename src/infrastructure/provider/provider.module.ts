import { Global, Module } from '@nestjs/common';
import { EmailModule } from './email';

@Global()
@Module({
  imports: [EmailModule],
})
export class ProviderModule {}

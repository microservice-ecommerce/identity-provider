
import { HttpExceptionFilter, LoggingInterceptor } from '@high3ar/common-api'
import { Global, Module, Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { PersistenceModule } from './persistence/persistence.module'

const providers: Provider[] = [
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor
  },
  {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  }
]

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true
    }),
    PersistenceModule,
  ],
  providers: [...providers],
  exports: []
})
export class InfrastructureModule {}

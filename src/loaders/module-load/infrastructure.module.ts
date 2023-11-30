
import { HttpExceptionFilter, LoggingInterceptor } from '@high3ar/common-api'
import { Global, Module, Provider } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'

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
    })
  ],
  providers: [...providers],
  exports: []
})
export class InfrastructureModule {}

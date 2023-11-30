import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'


import { RootModule } from './module-load/root.module'
import { IdentityProviderConfig } from 'src/config/identity-provider.config'

// eslint-disable-next-line @typescript-eslint/no-var-requires
export class ServerApplication {
  public async run(): Promise<void> {
    const app: NestExpressApplication =
      await NestFactory.create<NestExpressApplication>(RootModule)

    app.useGlobalPipes(new ValidationPipe())
    const { HOST, PORT, GLOBAL_PREFIX_API } = IdentityProviderConfig
   
    app.enableCors({ origin: '*' })

    app.setGlobalPrefix(GLOBAL_PREFIX_API)

    await app.listen(PORT).catch(error => {
      process.exit(1)
    })
  }

  public static new(): ServerApplication {
    return new ServerApplication()
  }
}



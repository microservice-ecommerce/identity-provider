import { H3Logger } from '@high3ar/common-api';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initializeTransactionalContext } from 'typeorm-transactional';
import * as process from 'node:process';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IdentityProviderConfig } from '../infrastructure/configuration/identity-provider.config';
import { RootModule } from './module-load/root.module';
import * as cookieParser from 'cookie-parser';

export class ServerApplication {
  public async run(): Promise<void> {
    initializeTransactionalContext();
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(RootModule);

    app.useGlobalPipes(new ValidationPipe());
    const { HOST, PORT, GLOBAL_PREFIX_API } = IdentityProviderConfig;

    app.enableCors({ origin: '*' });

    app.setGlobalPrefix(GLOBAL_PREFIX_API);
    app.use(cookieParser());

    this.registerSwagger(app);

    this.printEnv();
    H3Logger.initialize();

    await app.listen(PORT).catch((error) => {
      H3Logger.error(`🔥 Failed to start server, ${error.message}`);
      process.exit(1);
    });
    // icon slave

    H3Logger.info(`🚀 Server running on http://${HOST}:${PORT}/${GLOBAL_PREFIX_API}`);
    H3Logger.info(`👷 Worker running on  (${process.pid})`);
  }

  public static new(): ServerApplication {
    return new ServerApplication();
  }

  private printEnv(): void {
    console.log("===================== ENV ================");
    for (const key in IdentityProviderConfig) {
      if (IdentityProviderConfig.hasOwnProperty(key)) {
        console.log(`${key}: ${IdentityProviderConfig[key]}`);
      }
    }
    console.log("========================================");
  }
  private registerSwagger(app: NestExpressApplication): void {
    const options = new DocumentBuilder()
      .setTitle('Identity API')
      .setDescription('This is the Identity API documentation')
      .setVersion('1.0')
      .setBasePath('api')
      .addBearerAuth()
      .addCookieAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);
  }
}

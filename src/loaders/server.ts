import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";


import { IdentityProviderConfig } from '../config/identity-provider.config';
import { RootModule } from './module-load/root.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export class ServerApplication {
  public async run(): Promise<void> {
    const app: NestExpressApplication = await NestFactory.create<NestExpressApplication>(RootModule);

    app.useGlobalPipes(new ValidationPipe());
    const { HOST, PORT, GLOBAL_PREFIX_API } = IdentityProviderConfig;

    app.enableCors({ origin: '*' });

    app.setGlobalPrefix(GLOBAL_PREFIX_API);

    this.registerSwagger(app);

    await app.listen(PORT).catch(error => {
      process.exit(1);
    });
  }

  public static new(): ServerApplication {
    return new ServerApplication()
  }

  private registerSwagger(app: NestExpressApplication): void {
    const options = new DocumentBuilder()
      .setTitle("Identity API")
      .setDescription("This is the Identity API documentation")
      .setVersion("1.0")
      .setBasePath("api")
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("/docs", app, document);
  }
}



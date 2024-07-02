import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig,swaggerOptions } from 'config/swagger.config';
import { CONSTANT } from 'config/constant.config';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const MAIN_CONSTANT = CONSTANT.MAIN_CONSTANT;
  const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(
        MAIN_CONSTANT.OPEN_API_PATH,
        app,
        document,
        swaggerOptions,
    );


  await app.listen(8000);
}
bootstrap();
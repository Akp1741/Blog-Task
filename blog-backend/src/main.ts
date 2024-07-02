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

// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import * as express from 'express';
// import { SwaggerModule } from '@nestjs/swagger';
// import { swaggerConfig,swaggerOptions } from 'config/swagger.config';
// import { CONSTANT } from 'config/constant.config';
// import { ValidationPipe } from '@nestjs/common';

// async function bootstrap() {
//     const MAIN_CONSTANT = CONSTANT.MAIN_CONSTANT;

//     const app = await NestFactory.create(AppModule);
//     app.useGlobalPipes(new ValidationPipe());
//     app.setGlobalPrefix(MAIN_CONSTANT.GLOB_PREFIX);
//     app.enableCors({
//         origin: true,
//         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//         credentials: true,
//     });
//     app.use(express.static(MAIN_CONSTANT.STATIC_FOLDER));

//     const document = SwaggerModule.createDocument(app, swaggerConfig);
//     SwaggerModule.setup(
//         MAIN_CONSTANT.OPEN_API_PATH,
//         app,
//         document,
//         swaggerOptions,
//     );

//     await app.listen(process.env.APP_PORT);
// }
// bootstrap();

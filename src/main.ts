import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';
import { NODE_ENV } from './consts/env.enum';
import { HttpGlobalFilter } from './filters/httpException.filter';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('bootstrap');

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // dto에서 class-validator가 붙어있지 않은 속성은 모두 제거됨.
      forbidNonWhitelisted: true, // DTO에 정의되지 않은 값이 들어오면 무조건 400을 반환함.
      forbidUnknownValues: true, // 확인되지 않은 값이 들어오면 무조건 400을 반환함.
      transform: true, // 클라이언트에서 받은 값을 백엔드에서 지정한 값으로 형변환을 거침.
      transformOptions: {
        enableImplicitConversion: true, // class-transformer가 ts 유형을 기준으로 형변환을 진행.
      },
      disableErrorMessages:
        process.env.NODE_ENV === 'development' ? false : true,
    }),
  );

  // default setting
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new HttpGlobalFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Nest.js boilorplate')
    .setDescription('Nest.js boilorplate')
    .setVersion('0.0.1')
    .build();

  const swaggerURI = '/docs';

  SwaggerModule.setup(
    swaggerURI,
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );

  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
  });
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));

  await app.listen(
    configService.get('PORT'),
    configService.get('HOST'),
    async () => {
      logger.log(
        `Application is successfully running on ${await app.getUrl()}`,
      );
      logger.log(
        `Application Environment is **${configService.get('NODE_ENV')}** Mode`,
      );

      if (configService.get('NODE_ENV') !== NODE_ENV.PRODUCTION) {
        logger.verbose(`You can check ${await app.getUrl()}${swaggerURI}`);
      }
    },
  );
};

bootstrap();

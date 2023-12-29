import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';


async function bootstrap() {
  
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
  
    app.enableCors({
      'origin': configService.get('CORS_ORIGIN'),
      'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
      'allowedHeaders': 'Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With',
      'credentials': true,
    });
    app.use(cookieParser(configService.get('COOKIE_PARSER')));
    app.useGlobalPipes(new ValidationPipe( { transform: true }));
    await app.listen(5000);
    console.info('AN-INFO: Arranque correcto de la aplicación.');
  } catch (error) { 
    console.error('AN-ERROR: Error en arranque de la aplicación. ', error);
  }

}

bootstrap();

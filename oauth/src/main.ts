import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';


async function bootstrap() {
  try {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(cookieParser(configService.get('COOKIE_PARSER')));
  await app.listen(5000);
  console.info('AN-INFO: Arranque correcto de la aplicación.');
  } catch (error) { 
    console.error('AN-ERROR: Error en arranque de la aplicación. ', error);
  }
}
bootstrap();

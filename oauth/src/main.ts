import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
  console.info('AN-INFO: Arranque correcto de la aplicación.');
  } catch (error) { 
    console.error('AN-ERROR: Error en arranque de la aplicación. ', error);
  }
}
bootstrap();

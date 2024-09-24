/**
 * Módulo de configuración de MongoDB.
 */

import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { MongooseConfigService } from './mongoose-config.service';


@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    })
  ]
})
export class MongodbModule {}

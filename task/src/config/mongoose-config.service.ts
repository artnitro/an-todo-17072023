/**
 * Servicio para la configuarción de Mongoose.
 */

import { Injectable, OnModuleInit} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseOptionsFactory, MongooseModuleOptions } from '@nestjs/mongoose';

import { Connection } from 'mongoose';


@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {

  constructor(
    private configService: ConfigService,
  ) {}

  createMongooseOptions(): MongooseModuleOptions {

    return {
      uri: `mongodb://${this.configService.get('USER_MONGO')}:${this.configService.get('PWD_MONGO')}@${this.configService.get('HOST_MONGO')}:${this.configService.get('PORT_MONGO')}/${this.configService.get('DB_MONGO')}`,
      onConnectionCreate: ( connection: Connection ) => {
        connection.on('connected', () => {
          console.info('an-INFO: MongoDB está configurada correctamente.');
        });
        connection.on('error', (err) => {
          console.error(`an-ERROR: MongoDB error en la configuración: ${err}`);

        });
      }
    }

  }

}



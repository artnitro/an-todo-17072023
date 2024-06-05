/**
 * Módulo de configuración de MongoDB.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { DataSource } from 'typeorm';


// NOTE: synchronize: true, tenedlo sólo hasta que defina en concreto la base de datos con sus 
// tablas correspondientes, ya que el esquema se autocrea cada vez que se lanza la aplicación.
// NO USAR EN PRODUCCIÓN, ya que borra los datos. Usadlo para depuración y desarrollo.
// Cuando esté todo definido, asignarlo a false.


@Module({
  imports: [ 
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        host: configService.get('HOST_MONGO'),
        port: configService.get('PORT_MONGO'),
        username: configService.get('USER_MONGO'),
        password: configService.get('PWD_MONGO'),
        database: configService.get('DB_MONGO'),
        maxPoolSize: 5,
        logging: ['query', 'error'],
        autoLoadEntities: true,
        synchronize: true,
      }),
      dataSourceFactory: async (options) => {
        try {
          const dataSource = await new DataSource(options).initialize();
          console.info('an-INFO: MongoDB está configurada correctamente.');
          return dataSource;
        } catch (error) {
          console.error('an-ERROR: MongoDB error en la configuración: ', error);
        }
      },
    }),
  ]
})
export class MongodbModule {}

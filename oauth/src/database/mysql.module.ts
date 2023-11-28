/**
 * Módulo de configuración de MySQL.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { DataSource } from 'typeorm';


//NOTE: synchronize: true, tenedlo sólo hasta que defina en concreto la base de datos con sus 
// tablas correspondientes, ya que el esquema se autocrea cada vez que se lanza la aplicación.
// NO USAR EN PRODUCCIÓN, ya que borra los datos. Usadlo para depuración y desarrollo.
// Cuando esté todo definido, asignarlo a false.


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('HOST_MYSQL'),
        port: configService.get('PORT_MYSQL'),
        username: configService.get('USER_MYSQL'),
        password: configService.get('PWD_MYSQL'),
        database: configService.get('DB_MYSQL'),
        poolSize: 5,
        logging: ['query', 'error'],
        autoLoadEntities: true,
        synchronize: true,
      }),
      dataSourceFactory: async (options) => {
        try {
          const dataSource = await new DataSource(options).initialize();
          console.info('AN-INFO: MySQL está configurada correctamente.');
          return dataSource;
        } catch (error) {
          console.error('AN-ERROR: MySQL error en la configuración: ', error);
        }
      },
    }),
  ]
})
export class MysqlModule {}
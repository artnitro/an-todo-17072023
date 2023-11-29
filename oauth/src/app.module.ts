/**
 * Módulo central de la aplicación.
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MysqlModule } from './database/mysql.module';
import { GraphModule } from './database/graph.module';
 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MysqlModule,
    GraphModule,
  ],
})
export class AppModule {}

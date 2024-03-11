/**
 * Módulo central de la aplicación.
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import { MysqlModule } from './database/mysql.module';
import { GraphModule } from './database/graph.module';
import { RedisConfig } from './database/redis.config';
 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync(RedisConfig),
    MysqlModule,
    GraphModule,
  ],
})
export class AppModule {}

/**
 * Módulo general de la aplicación.
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongodbModule } from './config/mongodb.module';
import { GraphqlModule } from './config/graphql.module';
import { PubsubModule } from './pubsub/pubsub.module';
import { AppResolver } from './app.resolver';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongodbModule,
    GraphqlModule,
    PubsubModule,
  ],
  providers: [ AppResolver],
})
export class AppModule {}

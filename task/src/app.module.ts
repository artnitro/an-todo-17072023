/**
 * Módulo general de la aplicación.
 */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { MongodbModule } from './config/mongodb.module';
import { GraphqlModule } from './config/graphql.module';
import { PubsubModule } from './pubsub/pubsub.module';
import { UserModule } from './user/user.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
    UserModule,
    MongodbModule,
    GraphqlModule,
    PubsubModule,
  ],
  providers: [],
})
export class AppModule {}

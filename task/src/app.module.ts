/**
 * Módulo general de la aplicación.
 */

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MongodbModule } from './config/mongodb.module';
import { GraphqlModule } from './config/graphql.module';
import { PubsubModule } from './pubsub/pubsub.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    /* JwtModule.registerAsync({ // Dejar esto por ahora, puede que haga falta para auth guard de query y mutation. Si no fuese bien, inserto el ConfigService en el auth guard.
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }), */
    MongodbModule,
    GraphqlModule,
    PubsubModule,
  ],
  providers: [],
})
export class AppModule {}

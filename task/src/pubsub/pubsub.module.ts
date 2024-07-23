/**
 * Módulo pubsub para websockets.
 */

import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RedisPubSub } from 'graphql-redis-subscriptions';


export const PUB_SUB = 'PUB_SUB'

@Global()
@Module({
  providers: [
    {
      provide: PUB_SUB,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => 
        new RedisPubSub ({
          connection: {
            host: configService.get('HOST_REDIS'),
            port: configService.get('PORT_REDIS'),
            password: configService.get('PWD_REDIS'),
            db: 1,
          }
        })
    },
  ],
  exports: [PUB_SUB]
})
export class PubsubModule {}

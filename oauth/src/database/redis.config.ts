/**
 * Configuración de Redis para cache.
 */

import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';

import { redisStore } from "cache-manager-redis-store";


export const RedisConfig: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const store = await redisStore({
      socket: {
        host: configService.get('HOST_REDIS'),
        port: configService.get('PORT_REDIS'),
      },
      // username: <username, usually (default)>
      password: configService.get('PWD_REDIS'),
      // database: <redis database (0 - 15)>,
      ttl: 600, // Tiempo de expiración en segundos, para este caso 10 min.
    });
    return {
      store: () => store,      
    };
  },
  inject: [ConfigService],
};

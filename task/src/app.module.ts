import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongodbModule } from './config/mongodb.module';
import { GraphqlModule } from './config/graphql.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongodbModule,
    GraphqlModule,
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}

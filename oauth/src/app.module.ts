import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MysqlModule } from './database/mysql.module';
import { UserModule } from './database/user/user.module';
//import { OauthModule } from './oauth/oauth.module';
 

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MysqlModule,
    UserModule,
  //  OauthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

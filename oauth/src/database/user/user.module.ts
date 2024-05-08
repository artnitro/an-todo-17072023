/**
 * Módulo User.
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './user.entity';
import { MailService } from 'src/mailer/mail.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    })
  ],
  providers: [UserService, UserResolver, MailService],
})
export class UserModule {}

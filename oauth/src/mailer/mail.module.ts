/**
 * Módulo de configuración para el envío de correos.
 */

import { join } from 'path';

import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { MailService } from './mail.service';


@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get('HOST_MAIL'),
          port: configService.get('PORT_MAIL'),
          secure: false,
          auth: {
            user: configService.get('EMAIL_PASSWORD_USER'),
            pass: configService.get('EMAIL_PASSWORD_PASSWORD')
          }
        }, 
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          }
        }
      }),
    })
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}

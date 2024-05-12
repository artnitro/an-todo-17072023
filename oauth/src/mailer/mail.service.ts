/**
 * Servicio para el envñio de correos.
 */

import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { SenderPassword } from './mail.interface';


@Injectable()
export class MailService {

  constructor(
    private mailerService: MailerService,
  ){}

  /**
   * @description Envía el correo para poder modificar o recuperar la contraseña.
   * @param senderPassword 
   * @returns Promise<any>
   */
  async senderPassword(senderPassword: SenderPassword): Promise<any> {

    await this.mailerService
      .sendMail({
        to: senderPassword.email,
        from: '"No Reply" noreply@antodo.local',
        subject: 'No responder, cambio de contraseña solicitado.',
        template: './password',
        headers: {
          'x-tags': 'antodo-password'
        },
        context: {
          userData: senderPassword.uuid
        }
      });

  }

}

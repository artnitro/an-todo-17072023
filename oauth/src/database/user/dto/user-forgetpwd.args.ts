/**
 * DTO para credenciales de usuario.
 */

import { Field, ArgsType } from '@nestjs/graphql';

import { IsEmail, MinLength } from 'class-validator';


@ArgsType()
export class UserForgetpwd {

  @Field()
  @IsEmail()
  @MinLength(6, { message: 'Email demasiado corto.'})
  email: string;

}
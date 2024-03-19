/**
 * DTO para el cambio de ocntraseña del usuasio.
 */

import { Field, InputType } from '@nestjs/graphql';

import { IsString, IsEmail, MinLength } from 'class-validator';


@InputType()
export class ChangepwdInput {

  @Field()
  @IsEmail()
  @MinLength(6, { message: 'Email demasiado corto.'})
  email: string;

  @Field()
  @IsString()
  @MinLength(6, {message: 'Password demasiado corto.'})
  password: string;

}

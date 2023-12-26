/**
 * DTO para ver si es usuario regitrado.
 */

import { ArgsType, Field } from '@nestjs/graphql';

import { IsEmail, IsString, MinLength } from 'class-validator';


@ArgsType()
export class IsUser {

  @Field()
  @IsEmail()
  @MinLength(6, { message: 'Email demasiado corto.'})
  email: string;

  @Field()
  @IsString()
  @MinLength(6, { message: 'Password demasiado corto.'})
  password: string;

}
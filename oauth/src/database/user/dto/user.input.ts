/**
 * DTO para entrada de nuevo usuario.
 */

import { Field, InputType } from '@nestjs/graphql';

import { IsEmail, IsString, MinLength } from 'class-validator';

@InputType()
export class UserInput {

  @Field()
  @IsString()
  firstName: string;

  @Field()
  @IsString()
  lastName:string;
  
  @Field()
  @IsString()
  nickName?: string;

  @Field()
  @IsEmail()
  @MinLength(6, { message: 'Email demasiado corto.'})
  email: string;

  @Field()
  @IsString()
  @MinLength(6, { message: 'Password demasiado corto.'})
  password: string;

}
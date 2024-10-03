/**
 * DTO para la entrada de un nuevo usuario.
 */

import { Field, InputType } from '@nestjs/graphql';

import { IsEmail, IsString, MinLength } from 'class-validator';


@InputType()
export class UserInput {

  @Field()
  @IsString()
  firstName: string;

  @Field({ nullable: true })
  nickName?: string;

  @Field()
  @IsEmail()
  email: string;

}
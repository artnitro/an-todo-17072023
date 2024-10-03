/**
 * DTO para email.
 */

import { ArgsType, Field } from '@nestjs/graphql';

import { IsEmail } from 'class-validator';


@ArgsType()
export class Email {

  @Field()
  @IsEmail()
  email: string;

}
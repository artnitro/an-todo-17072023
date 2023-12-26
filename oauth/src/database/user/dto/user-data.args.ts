/**
 * DTO para credenciales de usurio.
 */

import { Field, ObjectType } from '@nestjs/graphql';

import { IsEmail, IsUUID, MinLength } from 'class-validator';

@ObjectType()
export class UserData {

  @Field()
  @IsUUID()
  id?: string;

  @Field()
  @IsEmail()
  @MinLength(6, { message: 'Email demasiado corto.'})
  email?: string;

}

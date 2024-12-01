/**
 * DTO para projectos de usuario.
 */

import { ArgsType, Field } from '@nestjs/graphql';

import { IsString } from 'class-validator';

@ArgsType()
export class UserProjects {

  @Field()
  @IsString()
  user: string;

}
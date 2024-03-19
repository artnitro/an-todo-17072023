/**
 * DTO para credenciales de usuario.
 */

import { Field, ArgsType } from '@nestjs/graphql';

import { IsUUID } from 'class-validator';


@ArgsType()
export class IsuserForgetpwd {

  @Field()
  @IsUUID()
  uuid: string;

}
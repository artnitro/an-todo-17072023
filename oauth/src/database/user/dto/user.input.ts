/**
 * DTO para entrada de nuevo usuario.
 */

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {

  @Field()
  firstName: string;

  @Field()
  lastName:string;
  
  @Field()
  nickName?: string;

  @Field()
  email: string;

  @Field()
  password: string;

}
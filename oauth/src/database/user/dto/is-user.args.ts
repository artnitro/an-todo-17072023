/**
 * DTO para ver si es usuario regitrado.
 */

import { ArgsType, Field } from '@nestjs/graphql';


@ArgsType()
export class IsUser {

  @Field()
  email: string;

  @Field()
  password: string;

}
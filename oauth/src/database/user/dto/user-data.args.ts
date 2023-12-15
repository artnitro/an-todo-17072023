/**
 * DTO para credenciales de usurio.
 */

import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserData {

  @Field()
  id?: string;

  @Field()
  email?: string;

}

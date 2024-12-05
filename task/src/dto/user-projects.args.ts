/**
 * DTO para projectos de usuario.
 */

import { ArgsType, Field, ID } from '@nestjs/graphql';

import { ObjectId } from 'mongoose';


@ArgsType()
export class UserProjects {

  @Field( () => ID )
  user: ObjectId;

}
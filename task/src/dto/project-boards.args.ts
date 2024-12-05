/**
 * DTO para tableros de projecto.
 */

import { ArgsType, Field, ID } from '@nestjs/graphql';

import { ObjectId } from 'mongoose';


@ArgsType()
export class ProjectBoard {

  @Field( () => ID ) 
  project: ObjectId;
}
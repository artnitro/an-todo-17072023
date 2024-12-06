/**
 * DTO para tareas de tableros.
 */

import { ArgsType, Field, ID } from '@nestjs/graphql';

import { ObjectId } from 'mongoose';


@ArgsType()
export class BoardTasks {

  @Field( () => ID ) 
  board: ObjectId;
}
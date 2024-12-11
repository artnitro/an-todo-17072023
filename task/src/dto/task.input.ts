/**
 * DTO para la entrada de Task.
 */

import { Field, InputType, ID } from '@nestjs/graphql';

import { IsString, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';


@InputType()
export class TaskInput {

  @Field()
  @IsString()
  task: string;

  @Field()
  @IsNumber()
  sort: number;

  @Field( () => ID ) 
  board: ObjectId;

}
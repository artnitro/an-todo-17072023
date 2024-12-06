/**
 * DTO para la entrada de Board.
 */

import { Field, InputType, ID } from '@nestjs/graphql';

import { IsString, IsNumber } from 'class-validator';
import { ObjectId } from 'mongoose';


@InputType()
export class BoardInput {

  @Field()
  @IsString()
  name: string;

  @Field()
  @IsNumber()
  sort: number;

  @Field( () => ID ) 
  project: ObjectId;

}
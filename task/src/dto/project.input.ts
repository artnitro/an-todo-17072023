/**
 * DTO para la entrada de Project.
 */

import { Field, InputType, ID } from '@nestjs/graphql';

import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';


@InputType()
export class ProjectInput {

  @Field()
  @IsString()
  name: string;

  @Field( () => ID ) 
  user: ObjectId;

}

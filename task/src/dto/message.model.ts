/**
 * DTO para el control de mensajes.
 */

import { Field, ObjectType} from '@nestjs/graphql';

import { IsString } from 'class-validator';


@ObjectType()
export class Message {

  @Field()
  @IsString()
  message: string;
  
}
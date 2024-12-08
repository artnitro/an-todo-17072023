/**
 * Creación de Task entity.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

import * as mongoose from 'mongoose';
import { ObjectId } from 'mongoose';
import { HydratedDocument } from 'mongoose';

import { Board } from 'src/board/board.entity';


export type TaskDocument = HydratedDocument<Task>;

@ObjectType()
@Schema({
  'minimize': false, 
  'validateBeforeSave': false,
  'optimisticConcurrency': true, 
  'timestamps': true,
})
export class Task {

  @Field(type => ID)
  _id?: ObjectId;

  @Field()
  @Prop({ requered: true })
  task: string;

  @Field()
  @Prop({ unique: true })
  sort: number;

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Board' })
  board: Board;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;

  @Field()
  @Prop({ default: null })
  deletedAt?: Date;

}

export const TaskSchema = SchemaFactory.createForClass(Task);

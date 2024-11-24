/**
 * Creación de Board entity.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

import * as mongoose from 'mongoose';
import { ObjectId } from 'mongoose';
import { HydratedDocument } from 'mongoose';

import { Project } from 'src/project/project.entity';


export type BoardtDocument = HydratedDocument<Board>;


@ObjectType()
@Schema({
  'minimize': false, 
  'validateBeforeSave': false,
  'optimisticConcurrency': true, 
  'timestamps': true,
})
export class Board {

  @Field(type => ID)
  _id?: ObjectId;

  @Field()
  @Prop({ requered: true })
  name: string;

  @Field()
  @Prop({ unique: true })
  sort: number;

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Project' })
  project: Project;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;

  @Field()
  @Prop({ default: null })
  deletedAt?: Date;

}

export const BoardSchema = SchemaFactory.createForClass(Board);

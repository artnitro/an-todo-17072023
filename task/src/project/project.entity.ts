/**
 * Creación de Porject entity.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

import * as mongoose from 'mongoose';
import { ObjectId } from 'mongoose';
import { HydratedDocument } from 'mongoose';

import { User } from 'src/user/user.entity';


export type ProjectDocument = HydratedDocument<Project>;


@ObjectType()
@Schema({
  'minimize': false, 
  'validateBeforeSave': false,
  'optimisticConcurrency': true, 
  'timestamps': true,
})
export class Project {

  @Field(type => ID)
  _id?: ObjectId;

  @Field()
  @Prop({ requered: true })
  name: string;

  @Field()
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;

  @Field()
  @Prop({ default: null})
  deletedAt?: Date;

}

export const ProjectSchema = SchemaFactory.createForClass(Project);


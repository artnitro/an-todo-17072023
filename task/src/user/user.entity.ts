/**
 * Creación de User entity.
 */

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

import { HydratedDocument, ObjectId } from 'mongoose';


export type UserDocument = HydratedDocument<User>;

@ObjectType()
@Schema({
  'minimize': false, // Como false, permite almacenar objetos vacíos. Por defecto: true.
  'strict': false, // Como false, permite guardar datos que no aparezca en la definición del Schema. Por defecto: true.
  'validateBeforeSave': false, // Como false, Mongoose deja de validar datos. Probaré validar con Mongoose y luego con class-validator.
  'optimisticConcurrency': true, // Como true, asegura que un documento que estás actualizando no cambia mientras se actualiza, cuando se carga mediante un find() o findOne() simultaaneamente a la actualización.
  'timestamps': true, // Como true, habilita la creación de createdAt y updatedAt en el esquema de forma automática por Mongoose. Por defect: false.
})
export class User {

  @Field(type => ID)
  _id?: ObjectId;

  @Field()
  @Prop({ requered: true})
  firstName: string;

  @Field()
  @Prop({ default: null })
  nickName?: string;

  @Field()
  @Prop({ unique: true})
  email: string;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;

  @Field({ nullable: true })
  @Prop({ default: null })
  deletedAt?: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);

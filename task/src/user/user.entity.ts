/**
 * Creación de Entity y ObjectType para User.
 */

import { Field, ObjectType} from '@nestjs/graphql';

import { Entity, ObjectIdColumn, PrimaryGeneratedColumn, ObjectId, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Project } from 'src/dto/project.model';

//NOTE: Columnas provisionales para Usuario.

@Entity()
@ObjectType()
export class User {

  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  @Field()
  id: string;

  @Column()
  @Field()
  fisrtName: string;

  @Column() 
  @Field({ nullable: true })
  nickName?: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column( type => Project )
  @Field( type => [Project], { nullable: true } )
  project?: Project[];
  
}

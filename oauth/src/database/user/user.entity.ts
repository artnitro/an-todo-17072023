/**
 * Creación de la tabla usuarios.
 */

import { Field, ObjectType} from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity()
@ObjectType()
export class User {

  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName:string;
  
  @Column()
  @Field()
  nickName?: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({default: true})
  @Field()
  isActive: boolean;

  @Column()
  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  @Field()
  updatedAt: Date;

}
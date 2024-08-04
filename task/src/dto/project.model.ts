/**
 * ObjectType Porject
 */

import { ObjectType, Field } from '@nestjs/graphql';

import { Column } from 'typeorm';


@ObjectType()
export class Project {

  @Column()
  @Field()
  name: string;

  constructor(name: string) {
    
    this.name = name;
    
  }

}
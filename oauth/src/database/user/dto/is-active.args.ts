/**
 * DTO para usuarios activos o no activos.
 */

import { ArgsType, Field } from '@nestjs/graphql';

import { IsBoolean } from 'class-validator';


@ArgsType()
export class IsActive {

  @Field()
  @IsBoolean()
  isActive: boolean;
  
}
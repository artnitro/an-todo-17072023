/**
 * Creación de la tabla usuarios.
 */

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fisrtName: string;

  @Column()
  lastname:string;
  
  @Column()
  nickName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({default: true})
  isActive: boolean;

}
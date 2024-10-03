/**
 * Service de User. Gestión CRUD...
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User } from './user.entity';
import { UserInput } from 'src/dto/user.input';


@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  /**
   * @description Encuentra un usuario.
   * @param data Object.
   * @returns Promise<User[]>
   */
  async getUser(data): Promise<User[]> {

    return await this.userModel.find(data).exec();

  }

  /**
   * @description Lista todos los usuarios
   * @returns Promise<User[]>
   */
  async getUsers(): Promise<User[]> {

    return await this.userModel.find().exec();
  }

  /**
   * @description Añade un usuario.
   * @param userInput 
   * @returns Promise<User>
   */
  async setUser( userInput: UserInput): Promise<User> {
    
    const addUser = new this.userModel(userInput);
    return await addUser.save();
    
  }

}

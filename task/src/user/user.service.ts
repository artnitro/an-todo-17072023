/**
 * Service de User. Gestión CRUD...
 */

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User } from './user.entity';
import { UserInput } from 'src/dto/user.input';
import { Email } from 'src/dto/email.args';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  /**
   * @description Encuentra un usuario por email.
   * @param data type Email.
   * @returns Promise<User[]>
   */
  async getUser(data: Email): Promise<User[]> {

    const { email } = data; 
    return await this.userModel.find({ email: email }).exec();

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
   * @param userInput type UserInput.
   * @returns Promise<User>
   */
  async setUser( userInput: UserInput): Promise<User> {
    
    const addUser = new this.userModel(userInput);
    return await addUser.save();
    
  }

}

/**
 * Provider para el mpdelo User.
 */

import { FactoryProvider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

import { User } from './user.entity';
import { CrudService } from "src/service/crud.service";


export const userProvider: FactoryProvider = {
  provide: 'USER_PROVIDER',
  inject: [ getModelToken(User.name) ],
  useFactory: ( userModel: any ) => new CrudService<User>(userModel),
}

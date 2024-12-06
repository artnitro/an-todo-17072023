/**
 * Provider para el modelo Board.
 */

import { FactoryProvider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

import { Board } from './board.entity';
import { CrudService } from 'src/service/crud.service';


export const boardProvider: FactoryProvider = {
  provide: 'BOARD_PROVIDER',
  inject: [ getModelToken(Board.name) ],
  useFactory: ( boardModel: any ) => new CrudService<Board>(boardModel),
}

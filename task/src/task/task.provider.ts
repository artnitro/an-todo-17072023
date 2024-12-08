/**
 * Provider para el modelo Task.
 */

import { FactoryProvider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

import { Task } from './task.entity';
import { CrudService } from 'src/service/crud.service';


export const TaskProvider: FactoryProvider = {
  provide: 'TASK_PROVIDER',
  inject: [ getModelToken(Task.name) ],
  useFactory: ( taskModel: any) => new CrudService<Task>(taskModel),
}

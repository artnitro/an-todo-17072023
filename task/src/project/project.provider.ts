/**
 * Provider para el modelo Project.
 */

import { FactoryProvider } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';

import { Project } from './project.entity';
import { CrudService } from 'src/service/crud.service';


export const projecProvider: FactoryProvider = {
  provide: 'PROJECT_PROVIDER',
  inject: [ getModelToken(Project.name) ],
  useFactory: ( projectModel: any ) => new CrudService<Project>(projectModel),
}

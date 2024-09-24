/**
 * Módulo User.
 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './user.entity';
import { Project, ProjectSchema } from 'src/project/project.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { ProjectService } from 'src/project/project.service';
import { ProjectResolver } from 'src/project/project.resolver';


@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Project.name,
        schema: ProjectSchema,
      }
    ]),
  ],
  providers: [ 
    UserService, 
    UserResolver,
    ProjectService,
    ProjectResolver,
  ],
})
export class UserModule {}

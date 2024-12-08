/**
 * Módulo User.
 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './user.entity';
import { UserResolver } from './user.resolver';
import { Project, ProjectSchema } from 'src/project/project.entity';
import { ProjectResolver } from 'src/project/project.resolver';
import { Board, BoardSchema } from 'src/board/board.entity';
import { BoardResolver } from 'src/board/board.resolver';
import { Task, TaskSchema } from 'src/task/task.entity';
import { TaskResolver } from 'src/task/task.resolver';
import { CrudService } from 'src/service/crud.service';
import { userProvider } from './user.povider';
import { projecProvider } from 'src/project/project.provider';
import { boardProvider } from 'src/board/board.provider';
import { TaskProvider } from 'src/task/task.provider';

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
      },
      {
        name: Board.name,
        schema: BoardSchema,
      },
      {
        name: Task.name,
        schema: TaskSchema,
      },
    ]),
  ],
  providers: [ 
    UserResolver,
    ProjectResolver,
    BoardResolver,
    TaskResolver,
    CrudService,
    userProvider,
    projecProvider,
    boardProvider,
    TaskProvider,
  ],
})
export class UserModule {}

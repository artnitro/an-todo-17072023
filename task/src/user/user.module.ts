/**
 * Módulo User.
 */

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { User, UserSchema } from './user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { Project, ProjectSchema } from 'src/project/project.entity';
import { ProjectService } from 'src/project/project.service';
import { ProjectResolver } from 'src/project/project.resolver';
import { Board, BoardSchema } from 'src/board/board.entity';
import { BoardService } from 'src/board/board.service';
import { BoardResolver } from 'src/board/board.resolver';


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
    ]),
  ],
  providers: [ 
    UserService, 
    UserResolver,
    ProjectService,
    ProjectResolver,
    BoardService,
    BoardResolver,
  ],
})
export class UserModule {}

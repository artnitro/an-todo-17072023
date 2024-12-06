/**
 * Resolver para Board.
 */

import { Inject } from '@nestjs/common';
import { Query, Resolver, Mutation, Args, Subscription } from '@nestjs/graphql';

import { RedisPubSub } from 'graphql-redis-subscriptions';

import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { Message } from 'src/dto/message.model';

import { Board } from './board.entity';
import { BoardInput } from 'src/dto/board.input';
import { ProjectBoard } from 'src/dto/project-boards.args';


const MESSAGE_ADDED_EVENT = 'messageAdded';

@Resolver(of => Board)
export class BoardResolver {

  constructor(
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
    @Inject('BOARD_PROVIDER') private boardProvider: any,
  ) {}

  @Query( () => [Board], { description: 'Query: Listar todos los tableros' })
  async boards(): Promise<Board[]> {

    this.pubSub.publish(MESSAGE_ADDED_EVENT, {
      newMessage: {
        message: 'Listar todos los tableros'
      }
    });

    return await this.boardProvider.getModels();

  }

  @Query( () => [Board], { description: 'Query: Listar los tableros de un proyecto'})
  async projectBoards(
    @Args() projectBoards: ProjectBoard
  ): Promise<Board[]> {

    this.pubSub.publish(MESSAGE_ADDED_EVENT, {
      newMessage: {
        message: 'Listar los tableros de un proyecto'
      }
    });
    
    return await this.boardProvider.getModelPopulate(projectBoards, 'project');

  }

  @Mutation( () => Board, { description: 'Mutation: Añadir un tablero' })
  async addBoard(
    @Args('boardInput') boardInput: BoardInput,
  ): Promise<Board> {
    
    this.pubSub.publish(MESSAGE_ADDED_EVENT, {
      newMessage: {
        message: 'Añadir un nuevo tablero'
      }
    });

    return await this.boardProvider.setModel(boardInput);
  }
 
  @Subscription(returns => Message, { description: 'Subscription: Mensajes enviados por cada acción que se haga'})
  newMessage() {

    return this.pubSub.asyncIterator(MESSAGE_ADDED_EVENT);

  }
  
}
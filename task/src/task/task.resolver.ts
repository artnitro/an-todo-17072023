/**
 * Resolver para Task.
 */

import { Inject } from '@nestjs/common';
import { Query, Resolver, Mutation, Args, Subscription } from '@nestjs/graphql';

import { RedisPubSub } from 'graphql-redis-subscriptions';

import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { Message } from 'src/dto/message.model';
import { Task } from './task.entity';
import { TaskInput } from 'src/dto/task.input';
import { BoardTasks } from 'src/dto/board-tasks.args';


const MESSAGE_ADDED_EVENT = 'messageAdded';

@Resolver(of => Task)
export class TaskResolver {

  constructor(
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
    @Inject('TASK_PROVIDER') private taskProvider: any,
  ) {}

  @Query( () => [Task], { description: 'Query: Listar todas las tareas' })
  async tasks(): Promise<Task[]> {

    this.pubSub.publish(MESSAGE_ADDED_EVENT, {
      newMessage: {
        message: 'Listar todas las tareas'
      }
    });

    return await this.taskProvider.getModels();

  }

  @Query( () => [Task], { description: 'Query: Listar las tareas de un tablero'})
  async boardTasks(
    @Args() boardTasks: BoardTasks,
  ): Promise<Task[]> {

    this.pubSub.publish(MESSAGE_ADDED_EVENT, {
      newMessage: {
        message: 'Listar las tareas de un tablero'
      }
    });
    
    return await this.taskProvider.getModelPopulate(boardTasks, 'board');

  }

  @Mutation( () => Task, { description: 'Mutation: Añadir una tarea a un tablero'})
  async addTask(
    @Args('taskInput') taskInput: TaskInput,
  ): Promise<Task> {

    this.pubSub.publish(MESSAGE_ADDED_EVENT, {
      newMessage: {
        message: 'Añadir una nueva tarea a un tablero'
      }
    });
    
    return await this.taskProvider.setModel(taskInput);

  }

  @Subscription(returns => Message, { description: 'Subscription: Mensajes enviados por cada acción que se haga'})
  newMessage() {

    return this.pubSub.asyncIterator(MESSAGE_ADDED_EVENT);

  }

}
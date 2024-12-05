/**
 * Resolver de Project.
 */

import { Inject } from '@nestjs/common';
import { Query, Resolver, Mutation, Args, Subscription } from '@nestjs/graphql';

import { RedisPubSub } from 'graphql-redis-subscriptions';

import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { Message } from 'src/dto/message.model';

import { Project } from './project.entity';
import { ProjectInput } from 'src/dto/project.input';
import { UserProjects } from 'src/dto/user-projects.args';
import { CrudService } from 'src/service/crud.service';


const MESSAGE_ADDED_EVENT = 'messageAdded';

@Resolver( of => Project )
export class ProjectResolver {

  constructor(
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
    @Inject('PROJECT_PROVIDER') private projectProvider: any,
  ) {}

  @Query( () => [Project], { description: 'Query: Lista todos los proyectos' })
  async projects(): Promise<Project[]> {

    this.pubSub.publish(MESSAGE_ADDED_EVENT, {
      newMessage: {
        message: 'Listar todos los projectos'
      }
    });

    return await this.projectProvider.getModels()

  }

  @Query( () => [Project], { description: 'Query: Listar los proyectos de usuario' })
  async userProjects(
    @Args() userProjects: UserProjects
  ): Promise<Project[]> {

    this.pubSub.publish(MESSAGE_ADDED_EVENT, {
      newMessage: {
        message: 'Listar los projectos de usuario'
      }
    });
    
    return await this.projectProvider.getModelPopulate(userProjects, 'user');
    
  }

  @Mutation( () => Project, { description: 'Mutation: Añadir un proyecto.' })
  async addProject(
    @Args('projectInput') projectInput: ProjectInput,
  ): Promise<Project> {
    
    this.pubSub.publish(MESSAGE_ADDED_EVENT, {
      newMessage: {
        message: 'Añadir un nuevo proyecto'
      }
    });

    return await this.projectProvider.setModel(projectInput);

  }

  @Subscription(returns => Message, { description: 'Subscription: Mensajes enviados por cada acción que se haga'})
  newMessage() {

    return this.pubSub.asyncIterator(MESSAGE_ADDED_EVENT);

  }

}

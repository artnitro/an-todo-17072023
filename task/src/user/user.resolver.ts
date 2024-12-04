/**
 * Resolver de User.
 */

import { Inject, UseGuards } from '@nestjs/common';
import { Query, Resolver, Mutation, Args, Subscription, Context } from '@nestjs/graphql';

import { RedisPubSub } from 'graphql-redis-subscriptions';

import { PUB_SUB } from 'src/pubsub/pubsub.module';
import { Message } from 'src/dto/message.model';
import { User } from './user.entity';
import { UserInput } from 'src/dto/user.input';
import { AuthGuard } from 'src/guards/auth.guard';
import { Email } from 'src/dto/email.args';
import { CrudService } from 'src/service/crud.service';

// NOTE: Para producción poner en donde sea necesario @UseGuards(AuthGuard), ya 
// que para desarrollo no lo utilizo, tendría que utilizar un JWT de usuario válido
// para cualquier tipo de operación de consulta y me ralentiza el trabajo. Lo pongo 
// provisionalmente en la consulta de bienvenida, a modo de prueba. Para Subcription
// no hace falta Guard, ya que en la propia configuración de GraphQL se gestiona la 
// autorización.

// NOTE: Puede que tenga problemas con el tipo para userProvider. Si hubiera, cambiarlo 
// de CrudService<User> a any. No creo que tenga problemas, ya que no tengo relacionada
// esta colección con otra colección.


const MESSAGE_ADDED_EVENT = 'messageAdded';

@Resolver( of => User)
export class UserResolver {

  constructor(
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
    @Inject('USER_PROVIDER') private readonly userProvider: CrudService<User>,
  ) {}

  @UseGuards(AuthGuard)
  @Query( () => String, { description: 'Query: Prueba para la aplicación'})
  getHello(
    @Context('req') req,
  ): string {

    const email: string = req.user.email;

    this.pubSub.publish(MESSAGE_ADDED_EVENT, {
      newMessage: {
        message: 'Muestro un saludo'
      }
    });

    return `Hola Arturo, desde GraphQL task server, con email: ${email}`;

  }

  @Query(() => [User], { description: 'Query: Lista un usuario.' })
  async getUser(@Args() data: Email): Promise<User[]> {

    this.pubSub.publish(MESSAGE_ADDED_EVENT, {
      newMessage: {
        message: 'Listar un usuario'
      }
    });

    return await this.userProvider.getModel(data);

  }

  @Query(() => [User], { description: 'Query: Listar todos los usuarios.' })
  async getUsers(): Promise<User[]> {

    this.pubSub.publish(MESSAGE_ADDED_EVENT, {
      newMessage: {
        message: 'Listar todos los usuarios'
      }
    });

    return await this.userProvider.getModels();

  }

  @Mutation( () => User, { description: 'Mutation: Añadir un usuario.' })
  async setUser(
    @Args('userInput') userInput: UserInput,
  ): Promise<User> {

    this.pubSub.publish(MESSAGE_ADDED_EVENT, {
      newMessage: {
        message: 'Añadir un nuevo usuario'
      }
    });

    return await this.userProvider.setModel(userInput);

  }

  @Subscription(returns => Message, { description: 'Subscription: Mensajes enviados por cada acción que se haga'})
  newMessage() {

    return this.pubSub.asyncIterator(MESSAGE_ADDED_EVENT);

  }

}

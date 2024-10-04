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
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Email } from 'src/dto/email.args';

// NOTE: Para producción poner en donde sea necesario @UseGuards(AuthGuard), ya 
// que para desarrollo no lo utilizo, tendría que utilizar un JWT de usuario válido
// para cualquier tipo de operación de consulta y me ralentiza el trabajo. Lo pongo 
// provisionalmente en la consulta de bienvenida, a modo de prueba. Para Subcription
// no hace falta Guard, ya que en la propia configuración de GraphQL se gestiona la 
// autorización.

const MESSAGE_ADDED_EVENT = 'messageAdded';

@Resolver( of => User)
export class UserResolver {

  constructor(
    @Inject(PUB_SUB) private readonly pubSub: RedisPubSub,
    private userService: UserService,
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

    return await this.userService.getUser(data);

  }

  @Query(() => [User], { description: 'Query: Listar todos los usuarios.' })
  async getUsers(): Promise<User[]> {

    this.pubSub.publish(MESSAGE_ADDED_EVENT, {
      newMessage: {
        message: 'Listar todos los usuarios'
      }
    });

    return await this.userService.getUsers();

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

    return await this.userService.setUser(userInput);

  }

  @Subscription(returns => Message, { description: 'Subscription: Mensajes enviados por cada acción que se haga'})
  newMessage() {

    return this.pubSub.asyncIterator(MESSAGE_ADDED_EVENT);

  }

}

/**
 *  Resolver para User
 */

// TODO: Validar campos de entrada para Mutation: createUser.

import { UnauthorizedException, NotAcceptableException, HttpException , Inject} from '@nestjs/common';
import { Resolver, Query, Mutation, Args, CONTEXT } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

import { UserService } from './user.service';
import { User } from './user.entity';
import { UserInput } from './dto/user.input';
import { Token } from './dto/token.args';
import { IsUser } from './dto/is-user.args';


@Resolver( of => User)
export class UserResolver {
  
  constructor( 
    private userService: UserService,
    private configService: ConfigService,
    @Inject(CONTEXT)
    private context,
  ){}

  @Query( () => String, { description: 'Consulta de prueba para la aplicación.'})
  getHello(): string {
    return 'Hola Arturo, desde GraphQL.';
  }

  @Query( () => Token, { description: 'Consulta para ver si es usuario o no de la aplicación' }) 
  async isUser(@Args() isUser: IsUser): Promise<Token | HttpException> {

    let  
      email,
      mail = ({ email } = isUser, { email }),
      { password } = isUser;

    const user = await this.userService.findOne(mail);

    if ( user !== null && bcrypt.compareSync(password, user.password)) {
      await this.userService.userId(user.id);
      return await this.userService.getToken(user);
    } else {
      throw new UnauthorizedException('Usuario no autorizado', { cause: new Error(), description: 'Usuario no autorizado o error en credenciales'});
    }

  }

  @Query( returns => Token, { description: 'Refresca sesión de usuario caducada' })
  async refreshUser(): Promise<Token> {

    const userId = this.context.req.signedCookies.userID;
    const user = await this.userService.findOne({ id: userId });
  
    if ( userId !== undefined && user !== null ) {
      await this.userService.userId(userId);
      return await this.userService.getToken(user);
    } else {
      throw new UnauthorizedException('Usuario no autorizado', { cause: new Error(), description: 'Usuario no autorizado o error en credenciales'});
    }
      
  }
  

  @Mutation( returns => Token, { description: 'Consulta para crear un usuario' })
  async createUser(
    @Args('userInput') userInput: UserInput,
  ): Promise<Token | HttpException> {
    
    let  
      email,
      mail = ({ email } = userInput, { email }),
      salt = bcrypt.genSaltSync(parseInt(this.configService.get('SALT_BCRYPT'),10));

    userInput.password = bcrypt.hashSync(userInput.password, salt);

    if ( await this.userService.findOne(mail) === null ) {
      const { id, ...userData } = await this.userService.create(userInput);
      await this.userService.userId(id);
      return await this.userService.getToken(userData);
    } else {
      throw new NotAcceptableException('Usuario ya registrado', { cause: new Error(), description: 'Usuario ya está regitrado en el sistema'});
    }
    
  }

}
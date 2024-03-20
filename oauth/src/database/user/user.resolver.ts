/**
 *  Resolver para User
 */

//TODO: Configurar el envío del correo para el cambio o actualización del password.

import { UnauthorizedException, NotAcceptableException, HttpException , Inject} from '@nestjs/common';
import { Resolver, Query, Mutation, Args, CONTEXT } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

import { UserService } from './user.service';
import { User } from './user.entity';
import { UserInput } from './dto/user.input';
import { Token } from './dto/token.args';
import { IsUser } from './dto/is-user.args';
import { UserForgetpwd } from './dto/user-forgetpwd.args';
import { IsuserForgetpwd } from './dto/isuser-fogetpwd.args';
import { ChangepwdInput } from './dto/changepwd.input';


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

  @Query( returns => String, { description: 'Identidicación del usuario que olvida o quiere cambiar el password'})
  async uuidForgetpwd(@Args() userForgetpwd: UserForgetpwd): Promise<string> {

    let  
      email,
      mail = ({ email } = userForgetpwd, { email });
    
    const user = await this.userService.findOne(mail);

    if ( user !== null ) { 
      return await this.userService.setForgetpwd(user.email);
    } else {
      throw new UnauthorizedException('Usuario no autorizado', { cause: new Error(), description: 'Usuario no autorizado o error en credenciales'});
    }

  }

  @Query(() => String, { description: 'Comprueba si el usuario permanece aún en la cache del sistema para el cambio de contraseña', nullable: true})
  async isUserForguetpwd(@Args() isuserForgetpwd: IsuserForgetpwd): Promise<string>  {

    return await this.userService.getForgetpwd(isuserForgetpwd.uuid);
    
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

  @Mutation ( returns => Boolean , { description: 'Consulta para cambiar el password' })
  async changePassword(
    @Args('changepwdInput') changepwdInput: ChangepwdInput,
  ): Promise<boolean> {

    const salt = bcrypt.genSaltSync(parseInt(this.configService.get('SALT_BCRYPT'),10));

    changepwdInput.password = bcrypt.hashSync(changepwdInput.password, salt);

    if ( await this.userService.updatePassword(changepwdInput) !== null ) {
      return true
    } else {
      throw new UnauthorizedException('Usuario no autorizado', { cause: new Error(), description: 'Usuario no autorizado o error en credenciales'});
    }

  }

}

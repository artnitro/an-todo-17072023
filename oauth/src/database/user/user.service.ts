/**
 * User service. Gestión CRUD y Cache del usuario.
 */

import { Injectable, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CONTEXT } from '@nestjs/graphql';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { v4 as uuidv4 } from 'uuid';

import { User } from './user.entity';
import { UserInput } from './dto/user.input';
import { Token } from './dto/token.args';
import { UserData } from './dto/user-data.args';
import { ChangepwdInput } from './dto/changepwd.input';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(CONTEXT) private context,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ){}

  /**
   * @description Crea un usuario
   * @param userInput 
   * @returns Promise<User>
   */
  async create(userInput: UserInput): Promise<User> {

    return await this.userRepository.save(userInput);
    
  }
  
  /**
   * @description Lista todos los usuarios en activo.
   * @returns Promise<User[]>
   */
  async getUsers(): Promise<User[]> {

    return await this.userRepository.find();

  }

  /**
   * @description Encuentra un usuario por id o email
   * @param data 
   * @returns Promise<User>
   */
  async findOne( data: UserData ): Promise<User> {
    
    return await this.userRepository.findOneBy(data)
    
  }

  /**
   * @description Actualiza el password del usuario
   * @param changepwdInput 
   * @returns Promise<User>
   */
  async updatePassword ( changepwdInput: ChangepwdInput ): Promise<User> {

    let  
      email,
      password,
      mail = ({ email } = changepwdInput, { email }),
      pwd =  ({ password } = changepwdInput, { password });

    await this.userRepository.update( mail, pwd );
    return await this.userRepository.findOneBy(mail);

  }

  /**
   * @description Obtenemos Token con datos del usuario
   * @param tokenData 
   * @returns Promise<token>
   */
  async getToken(tokenData: UserInput): Promise<Token> {

    const { firstName, nickName, email} = tokenData;

    return {
      access_token: await this.jwtService.signAsync({
        isLogged: true,
        firstName,
        nickName,
        email
      }, {
        expiresIn: parseInt(this.configService.get('TOKEN_LIFE'), 10),
      })
    }
    
  } 

  /**
   * @description Establece cookie de usuario
   * @param id
   * @returns Promise<void> 
   */
  async userId(id: string): Promise<void> {
    
    await this.context.res.cookie('userID', id, {
      domain: 'antodo.local',
      maxAge: parseInt(this.configService.get('REFRESH_TOKEN'),10), 
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      signed: true,
    });

  }

  /**
   * @description Establece en cache la clave del usuario y email
   * @param data 
   * @returns Promise<string>
   */
  async setForgetpwd(data: string): Promise<string> {
    
    const uuid: string = uuidv4();
    await this.cacheManager.set(uuid, data);
    return uuid;

  }

  /**
   * @description Obtiene si el usuario esta aún en cache
   * @param data 
   * @returns Promise<string | null>
   */
  async getForgetpwd(data: string): Promise<string | null> {

    return await this.cacheManager.get(data);

  }

}

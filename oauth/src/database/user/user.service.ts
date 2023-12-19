/**
 * User service. Gestión CRUD del usuario.
 */

import { Injectable, Inject} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CONTEXT } from '@nestjs/graphql';

import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UserInput } from './dto/user.input';
import { Token } from './dto/token.args';
import { UserData } from './dto/user-data.args';


@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(CONTEXT)
    private context,
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
   * @description Encuentra un usuario por id o email
   * @param data 
   * @returns Promise<User>
   */
  async findOne( data: UserData ): Promise<User> {
    
    return await this.userRepository.findOneBy(data)
    
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

}
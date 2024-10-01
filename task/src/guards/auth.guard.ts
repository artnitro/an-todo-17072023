/**
 * Authorization guards para la aplicación.
 */

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private jwtService: JwtService,
  ){}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const bearer = request.headers.authorization;

    if ( !bearer ) {
      throw new UnauthorizedException('Usuario no autorizado', { cause: new Error(), description: 'Usuario no autorizado o error en credenciales'});
    }
    
    try {
      const token = request.headers.authorization.replace('Bearer ', '');
      const payload = await this.jwtService.verifyAsync(token);
      //console.log('an-LOG: Usuario autorizado. Desde AuthGard, valor del payload: ', payload);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('Usuario no autorizado', { cause: new Error(), description: 'Usuario no autorizado o error en credenciales'});
    }

    return true;

  }

}


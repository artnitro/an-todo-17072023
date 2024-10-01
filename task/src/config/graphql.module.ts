/**
 * Módulo de configuración de GraphQL.
 */

// NOTE: Si es necesario para obtener mayor información de los errores producidos en 
// desarrollo, comentar el método formatError de GraphQLModule y descomentar cuando 
// no sea necesario. Puende ocasionar errores en en frontend, debido a que se espera
// una respuesta formateada para los errores así.
// NOTE: La propiedad message, de formatError, siempre tiene que retornarse ya que 
// causa error sino se retorna.
// NOTE: Para trabajar en desarrollo, he anulado el lanzamiento de error cuando no se suministra el token, ya
// que el Sandbox de Apollo no tiene la capacidad de enviar datos perteneciente a connectionParams, que es lo que 
// se trabaja con sockets. Por tanto, desactivo el lanzamiento de error y puedo seguir trabajando. Desde la 
// ejecución de la aplicación funciona todo correctamente. Si encuento una solución a esto, borraré esto y 
// aplicaré esta solución.

import { join } from 'path';

import { Module, UnauthorizedException } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';


@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [JwtModule, ConfigModule],
      inject: [JwtService, ConfigService],
      useFactory: async ( jwtService: JwtService, configService: ConfigService ) => ({
        path: '/task/v1',
        context: ({ req, res }) => ({ req, res }),
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'), 
        sortSchema: true,
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        formatError: ({ message, extensions }) => {
          const originalError = extensions.originalError;
          return {
            message,
            originalError,
          }
        },
        subscriptions: {
          'graphql-ws': {
            path: '/task/v1/',
            onConnect: (ctx) => {
              const token: string = ctx.connectionParams.Authorization ? ctx.connectionParams.Authorization.toString().replace('Bearer ', '') : '';
              if ( token !== '') {
                try {
                  const payload = jwtService.verify(token, {
                    secret: configService.get('JWT_SECRET'),
                  });
                  //console.log('an-LOG: Usuario autorizado, valor del payload: ', payload);
                } catch {
                  throw new UnauthorizedException('Usuario no autorizado', { cause: new Error(), description: 'Usuario no autorizado o error en credenciales'});
                };
              } else {
                // throw new UnauthorizedException('Usuario no autorizado', { cause: new Error(), description: 'Usuario no autorizado o error en credenciales'});
                console.error('an-ERROR: Usuario no autorizado, token no suministrado.');
              }
            }
          }
        },
      }),
    })
  ],
  controllers: [],
  providers: [],
})
export class GraphqlModule {}

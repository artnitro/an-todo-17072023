/**
 * Módulo de configuración de GraphQL.
 */

// NOTE: Si es necesario para obtener mayor información de los errores producidos en 
// desarrollo, comentar el método formatError de GraphQLModule y descomentar cuando 
// no sea necesario. Puende ocasionar errores en en frontend, sdebido a que se espera
// una respuesta formateada para los errores así.
// NOTE: La propiedad message, de formatError, siempre tiene que retornarse ya que 
// causa error sino se retorna.

import { join } from 'path';

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { UserModule } from './user/user.module';


@Module({
  imports: [
    UserModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      path: 'oauth/v1/',
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
    })
  ],
  controllers: [],
  providers: [],
})
export class GraphModule {}

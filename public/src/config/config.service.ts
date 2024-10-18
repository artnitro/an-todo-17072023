/**
 * Servicio de configuración de arranque de la aplicación.
 */

// NOTE: No se puede inyectar Renderer2 dentro de un servicio, pero podemos obtener
// una instancia de Renderer2 a partir de RendererFactory2, como muestro a continuación.
// NOTE: Cuando tenga definida la configuración de usuario dentro de la aplicación, la 
// imagen de fondo será cargada desde las que tenga seleccionada en su directorio personal.
// Esa o esas imágenes, las subirá a su directorio personal.

import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { HttpParams } from '@angular/common/http';

import { Apollo, gql } from 'apollo-angular';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Unsubscribe } from 'src/decorators/unsubscribe.decorator';
import { user, userForgetpwd } from 'src/shared/signals/user.signal';


// Interfaces.

interface IColors {
  [key: string]: any, 
}

interface IBackgroundImages {
  [key: string]: string,
}

interface IConfig {
  backgroundImage?: boolean,
  userRoute?: boolean,
  userForgotPassword?: boolean,
}

// Constantes globales.

export const colors: IColors = {
  red: 'rgb(225 29 72)',
}

export const backgroundImages: IBackgroundImages = {
  global: '../assets/img/bg-desktop.jpg',
}

// Consultas GraphQL.

const GET_REFRESH_USER = gql`
  query {
    refreshUser {
      access_token
    }
  }
`;


// Servicio.

@Injectable({
  providedIn: 'root',
})
@Unsubscribe()
export class ConfigService {

  private renderer!: Renderer2;
  private querySubscription$: Subscription = new Subscription();
  private params!: URLSearchParams;

  constructor(
    private rendererFactory: RendererFactory2,
    private router: Router,
    private apollo: Apollo,
    @Inject(DOCUMENT) private document: Document,
  ) {
    
    this.renderer = rendererFactory.createRenderer(null, null);
    this.params = new URLSearchParams(document.defaultView?.location.search);

  }

  /**
   * @description Establece la imagen de fondo de la aplicación
   * @returns IConfig
   */
  setBackground(): IConfig {

    const bgImage: string = backgroundImages['global'];

    this.renderer.setStyle(document.body, 'background', 'url(' + bgImage + ') no-repeat center center fixed');
	  this.renderer.setStyle(document.body, 'background-size', 'cover');
    return { backgroundImage: true };

  }

  /**
   * @description Configuración para olvido de password de usuario
   * @returns IConfig
   */
  userForgetPassword(): IConfig {

    if ( this.params?.get('user') ) {
      const token: any = this.params?.get('user');
      userForgetpwd.set(token);
      this.router.navigate(['/forgetpwd']);
      return { userForgotPassword: true };
    } 
    return { userForgotPassword: false };

  }

  /**
   * @description Configura ruta de navegación del usuario, si token es válido
   * @returns IConfig
   */
  setUser(): IConfig {

    if ( this.params?.size === 0 ) {
      this.querySubscription$ = this.refreshUser$()
      .pipe(map(result => result.data.refreshUser))
      .subscribe({
        next: (refreshUser) => {
          user.set(refreshUser.access_token);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          Object
            .keys(err.graphQLErrors)
            .filter( element => {
              const { originalError } = err.graphQLErrors[element];
              if ( originalError.statusCode === 400 || originalError.statusCode === 401 ) {
                this.router.navigate(['/signin']);
              }
            }); 
        }
      });
      return { userRoute: true};
    } 
    return { userRoute: false };

  }

  /**
   * @description Consulta para refrescar usuario
   * @returns Observable<any>
   */
  private refreshUser$(): Observable<any> {
    
    return this.apollo
      .use('oauth')
      .watchQuery({
        query: GET_REFRESH_USER,
      })
      .valueChanges;
      
  }

}

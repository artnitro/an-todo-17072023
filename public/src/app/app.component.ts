import { Component, Renderer2, OnInit, Inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { BGIMAGES } from 'src/shared/config';
import { AppService } from './app.service';
import { user, userForgetpwd } from 'src/shared/signals/user.signal';
import { Unsubscribe } from 'src/decorators/unsubscribe.decorator';


@Component({
  selector: 'an-todo-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
@Unsubscribe()
export class AppComponent implements OnInit {

  querySubscription$: Subscription = new Subscription();

  constructor(
    private renderer: Renderer2,
    private appService: AppService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document, 
  ){}

  ngOnInit() {

    const bgImage: string = BGIMAGES['global'];
    const userForgetPasswordData: any = this.document.defaultView?.location.href.split('=')[1];
    
    // Establezco imagen de fondo (provisional) de la aplicación.

    this.renderer.setStyle(document.body, 'background', 'url(' + bgImage + ') no-repeat center center fixed');
	  this.renderer.setStyle(document.body, 'background-size', 'cover');

    // Gestiono datos de usuario.

    if ( this.document.defaultView?.location.href.indexOf('user') !== -1) {
      userForgetpwd.set(userForgetPasswordData);
      this.router.navigate(['/forgetpwd']);
    } else {
      this.querySubscription$ = this.appService
        .refreshUser$()
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
    }

  }

}


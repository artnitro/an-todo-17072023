import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgStyle } from '@angular/common';

import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'an-todo-root',
  standalone: true,
  imports: [RouterOutlet, NgStyle],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Establezco imagen de fondo por defecto de la aplicación.

  bgImage: string = environment.bgImage;
  
}


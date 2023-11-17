import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgStyle } from '@angular/common';

import { BGIMAGES } from 'src/shared/config';


@Component({
  selector: 'an-todo-root',
  standalone: true,
  imports: [RouterOutlet, NgStyle],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // Establezco imagen de fondo (provisional) de la aplicación.

  bgImage: string = BGIMAGES['global'];
  
}


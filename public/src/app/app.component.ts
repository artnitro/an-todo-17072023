import { Component, Renderer2, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { BGIMAGES } from 'src/shared/config';


@Component({
  selector: 'an-todo-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private renderer: Renderer2,
  ){}

  ngOnInit() {

    const bgImage: string = BGIMAGES['global'];

    // Establezco imagen de fondo (provisional) de la aplicación.

    this.renderer.setStyle(document.body, 'background', 'url(' + bgImage + ') no-repeat center center fixed');
	  this.renderer.setStyle(document.body, 'background-size', 'cover');

  }
  
}


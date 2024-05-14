import { Component, Input } from '@angular/core';

@Component({
  selector: 'an-todo-card-password',
  standalone: true,
  imports: [],
  templateUrl: './card-password.component.html',
  styleUrl: './card-password.component.scss'
})
export class CardPasswordComponent {

  @Input() text: string = '';

  constructor() {}

}

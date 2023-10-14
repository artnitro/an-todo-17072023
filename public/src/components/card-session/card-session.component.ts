import { Component, Input} from '@angular/core';

@Component({
  selector: 'an-todo-card-session',
  standalone: true,
  imports: [],
  templateUrl: './card-session.component.html',
  styleUrls: ['./card-session.component.scss']
})
export class CardSessionComponent {

  @Input() title: String = '';
  
  constructor() {}
}

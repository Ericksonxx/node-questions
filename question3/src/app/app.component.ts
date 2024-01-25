import { Component } from '@angular/core';
import {InputComponent} from './input/input.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InputComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Age Clock'
}

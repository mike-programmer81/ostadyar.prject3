import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<body><router-outlet></router-outlet></body>'
  })
  export class AppComponent {
  }

import { Component, isDevMode } from '@angular/core';
import { UsersComponent } from './components/users/users.component';
@Component({
  selector: 'app-root',
  imports: [UsersComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  ngOnInit() {
    if (isDevMode()) {
      console.log('AppComponent initialized in development mode');
    } else {
      console.log('AppComponent initialized in production mode');
    }
  }
}

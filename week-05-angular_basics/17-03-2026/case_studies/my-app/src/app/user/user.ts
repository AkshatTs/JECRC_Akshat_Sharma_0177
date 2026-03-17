import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  title = 'My App';
  users = [
    { name: 'Akshat', email: 'akshat@example.com' },
    { name: 'John', email: 'john@example.com' },
    { name: 'Jane', email: 'jane@example.com' }
  ]
  user = { name: 'Akshat', age: 30};
  getGreeting(){
    return 'Welcome to Angular ' + this.user.name;
  }
}

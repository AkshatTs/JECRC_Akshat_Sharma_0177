import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav>
      <a routerLink="/employees">Employees</a>
      <a routerLink="/login">login</a>
    </nav>
  `,
  styleUrl: './navbar.css',
})
export class Navbar {}

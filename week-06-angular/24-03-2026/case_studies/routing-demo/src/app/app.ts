import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <h1>Angular Routing Demo</h1>
    <nav>
      <a routerLink="/home">Home</a>
      <br>
      <a routerLink="/contact">Contact</a>
      <br>
      <a routerLink="/products">Product</a>
    </nav>
    <hr>
    <router-outlet></router-outlet>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('routing-demo');
}

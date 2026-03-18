import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PriceHighlightDirective } from './price-highlight';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PriceHighlightDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  products = [
    { name: 'Laptop', price: 65000 },
    { name: 'Desk', price: 3500 },
    { name: 'Chocolate', price: 55 },
    { name: 'Watch', price: 2000 }
  ];
}
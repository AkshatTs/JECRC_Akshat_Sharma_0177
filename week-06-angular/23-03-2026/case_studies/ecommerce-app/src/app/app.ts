import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ProductList } from './product-list/product-list';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ProductList, Cart, Checkout],
  template: `
    <h1>E-Commerce App</h1>
    <div class="container">
      <app-product-list></app-product-list>
      <app-cart></app-cart>
      <app-checkout></app-checkout>
    </div>
  `,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ecommerce-app');
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-product',
  imports: [CommonModule],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  products = [
    { name: 'Laptop', price: 50000 },
    { name: 'Smartphone', price: 20000 },
    { name: 'Tablet', price: 30000 }
  ];
}

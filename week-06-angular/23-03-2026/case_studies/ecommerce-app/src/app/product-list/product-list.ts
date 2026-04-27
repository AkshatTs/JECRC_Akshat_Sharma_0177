import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit{
  products: any[] = [];
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ){}
  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }
  addToCart(product: any){
    this.cartService.addToCart(product);
  }
}

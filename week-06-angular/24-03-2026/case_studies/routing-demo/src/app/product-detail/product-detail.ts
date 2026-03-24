import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="card" *ngIf="product">
      <h2>{{ product.name }}</h2>
      <p>ID: {{ product.productID }}</p>
      <p>Price: \${{ product.price }}</p>
    </div>`
})
export class ProductDetail implements OnInit {
  product: any;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);
  }
}

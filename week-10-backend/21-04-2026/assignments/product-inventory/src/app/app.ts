import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {
  allProducts: Product[] = [];
  displayProducts: Product[] = [];
  
  categories: string[] = [];
  selectedCategory: string = '';
  showInStockOnly: boolean = false;

  ngOnInit() {
    this.allProducts = this.getProducts();
    this.displayProducts = [...this.allProducts];
    
    // Extracting unique categories for the dropdown menu
    this.categories = [...new Set(this.allProducts.map(p => p.category))];
  }

  // Standard mock data for a professional inventory task
  getProducts(): Product[] {
    return [
      { id: 101, name: "Wireless Headphones", category: "Electronics", price: 2500.00, stock: 15 },
      { id: 102, name: "Office Chair", category: "Furniture", price: 8500.00, stock: 0 },
      { id: 103, name: "Mechanical Keyboard", category: "Electronics", price: 3200.00, stock: 8 },
      { id: 104, name: "Wooden Desk", category: "Furniture", price: 12000.00, stock: 4 },
      { id: 105, name: "Notebook Set", category: "Stationery", price: 450.00, stock: 50 },
      { id: 106, name: "Gaming Mouse", category: "Electronics", price: 1800.00, stock: 0 },
      { id: 107, name: "Laptop Stand", category: "Accessories", price: 1500.00, stock: 12 }
    ];
  }

  // Logic to handle both category and stock filtering
  applyFilter() {
    let tempArray = [...this.allProducts];

    if (this.selectedCategory && this.selectedCategory !== '') {
      tempArray = tempArray.filter(product => product.category === this.selectedCategory);
    }

    if (this.showInStockOnly) {
      tempArray = tempArray.filter(product => product.stock > 0);
    }

    this.displayProducts = tempArray;
  }

  // Sorts the currently displayed products by price in ascending order
  sortPrice() {
    this.displayProducts.sort((a, b) => a.price - b.price);
  }
}
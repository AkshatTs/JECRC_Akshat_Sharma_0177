import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  //Data
  productName = 'Laptop';
  price = 50000;
  quantity = 1;
  isAvailable = true;
  // isDisabled = false;
  imageUrl = 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg';

  //Two way data binding
  customerName = '';
  address = '';

  //Method (Event Binding)
  increaseQty() {
    this.quantity++;
  }
  decreaseQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  toggleAvailability() {
    this.isAvailable = !this.isAvailable;
  }
  // toggleButton() {
  //   this.isDisabled = !this.isDisabled;
  // }
  getTotal() {
    return this.price * this.quantity;
  }
}

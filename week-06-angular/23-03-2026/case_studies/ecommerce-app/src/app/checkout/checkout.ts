import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  form = {
    name: '',
    email: '',
    address: '',
    payment: ''
  };
  submit(){
    alert('Order Placed Successfully');
    console.log(this.form);
  }
}

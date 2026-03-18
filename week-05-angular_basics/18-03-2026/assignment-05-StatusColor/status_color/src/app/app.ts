import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusColorDirective } from './status-color';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, StatusColorDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  students = [
    { name: 'Akshat', marks: 97 },
    { name: 'Lakshay', marks: 39 },
    { name: 'Akshay', marks: 69 },
    { name: 'Kushagra', marks: 28 }
  ];
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './highlight';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HighlightDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  students = [
    { name: 'Akshat', marks: 98 },
    { name: 'Lakshay', marks: 43 },
    { name: 'Anurag', marks: 79 },
    { name: 'Indresh', marks: 87 },
    { name: 'Kushagra', marks: 21 }
  ];

  getGrade(marks: number): string {
    if (marks >= 90) return 'A';
    else if (marks >= 75) return 'B';
    else if (marks >= 50) return 'C';
    else return 'F';
  }
}
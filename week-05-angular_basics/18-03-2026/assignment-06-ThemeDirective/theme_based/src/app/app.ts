import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeDirective } from './theme';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ThemeDirective, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  theme = 'light'; 
}
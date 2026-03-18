import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickBlockDirective } from './click-block';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ClickBlockDirective, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  isAllowed = true;
}
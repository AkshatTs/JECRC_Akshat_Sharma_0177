import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDirective } from './role';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RoleDirective],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
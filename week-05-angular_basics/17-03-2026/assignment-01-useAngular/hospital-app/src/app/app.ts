import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Appointment } from './appointment/appointment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Appointment],
  template: `<app-appointment></app-appointment>`,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hospital-app');
}

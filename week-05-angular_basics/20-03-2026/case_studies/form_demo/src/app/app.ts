import { Component, signal } from '@angular/core';
import { FormFeedback } from './form-feedback/form-feedback';
import { CommonModule } from '@angular/common';
import { EmployeeForm } from './employee-form/employee-form';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormFeedback, EmployeeForm],
  template: `
    <div style="flex:1; min-width:300px; border:1px solid #ccc; padding:10px;">
        <h2>Employee Form</h2>
        <app-employee-form></app-employee-form>
    </div>
    <h1 style="text-align:center;">Angular 21 Template-driven Demo</h1>


      <div style="flex:1; min-width:300px; border:1px solid #ccc; padding:10px;">
        <h2>Employee Feedback</h2>
        <app-form-feedback></app-form-feedback>
      </div>`,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('form_demo');
}

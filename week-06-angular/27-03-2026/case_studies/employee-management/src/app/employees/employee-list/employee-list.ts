import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../core/services/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Employee List</h2>
    <ul>
      <li *ngFor="let emp of employees">
        {{ emp.name }} - {{ emp.role }}
      </li>
    </ul>
  `,
  styleUrl: './employee-list.css',
})
export class EmployeeList {
  employees: any[] = [];

  constructor(private service: EmployeeService) {}

  ngOnInit() {
    this.employees = this.service.getEmployees();
  }
}

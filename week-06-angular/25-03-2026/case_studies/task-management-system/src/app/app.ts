import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TaskFormComponent } from './task-form/task-form';
import { TaskListComponent } from './task-list/task-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, TaskFormComponent, TaskListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('task-management-system');
}

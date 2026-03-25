import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.html',
  styleUrls: ['./task-form.css']
})
export class TaskFormComponent {

  title: string = '';

  constructor(private taskService: TaskService) {}

  addTask() {
    if (!this.title.trim()) return;

    const newTask: Task = {
      title: this.title,
      completed: false
    };

    this.taskService.addTask(newTask).subscribe(() => {
      alert('Task Added');
      this.title = '';
    });
  }
}
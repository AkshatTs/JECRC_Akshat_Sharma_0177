import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.css']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [];
  searchTerm: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data;
    });
  }

  deleteTask(id: number | undefined) {
    if (!id) return;
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  toggleStatus(task: Task) {
    if (!task.id) return;
    this.taskService.updateTaskStatus(task.id, !task.completed)
      .subscribe(() => {
        task.completed = !task.completed;
      });
  }

  searchTasks() {
    if (!this.searchTerm) {
      this.loadTasks();
      return;
    }

    this.taskService.searchTasks(this.searchTerm)
      .subscribe(data => {
        this.tasks = data;
      });
  }
}
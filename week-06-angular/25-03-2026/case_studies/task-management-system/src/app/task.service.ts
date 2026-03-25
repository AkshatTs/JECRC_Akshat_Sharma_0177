import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Task } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private api = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private http: HttpClient){}
  //Get All Tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.api);
  }

  //Get Task By Id
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.api}/${id}`);
  }

  //Create Task(POST)
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.api, task);
  }

  //Update Full Task(PUT)
  updateTask(task: Task): Observable<Task>{
    return this.http.put<Task> (`${this.api}/${task.id}`, task);
  }

  //Partial Update (PATCH)
  updateTaskStatus(id: number, completed: boolean): Observable<Task>{
    return this.http.patch<Task>(`${this.api}/${id}`, {
      completed: completed
    });
  }

  //Generic Patch (Reusable)
  updatePartial(id: number, data: Partial<Task>): Observable<Task>{
    return this.http.patch<Task>(`${this.api}/${id}`, data);
  }

  //Delete Task
  deleteTask(id: number): Observable<any>{
    return this.http.delete(`${this.api}/${id}`);
  }

  //Search Task (API Filter)
  searchTasks(term: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.api}?title_like=${term}`);
  }
}

import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses: Course[] = [
    { id: 1, title: 'Angular', description: 'Learn Angular from scratch', duration: '4 weeks', instructor: 'Benhar Charles' },
    { id: 2, title: 'React', description: 'Learn React fundamentals', duration: '3 weeks', instructor: 'Akshatha B M' },
    { id: 3, title: 'JavaSpring', description: 'Backend development', duration: '5 weeks', instructor: 'Rahul Tripathi' }
  ];

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(c => c.id === id);
  }
}
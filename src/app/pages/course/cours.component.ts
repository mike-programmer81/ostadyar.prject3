import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

import { Course } from '../../models/course.model';
import { CoursesService } from '../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: 'course.component.html',
  standalone: true,
  imports: [DialogModule, ButtonModule, CardModule, TableModule, CommonModule]
})
export class CoursesComponent implements OnInit {

  courseDialog = false;
  studentsDialog = false;
  examsDialog = false;

  selectedCourse: Course | null = null;
  courses: Course[] = [];

  constructor(private coursesService: CoursesService) {}   // ✔ درست شد

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.coursesService.getCourses().subscribe({
      next: (data: Course[]) => {
        this.courses = data;
      },
      error: (err: any) => {
        console.error('Error loading courses:', err);
      }
    });
  }

  openCourse(course: Course) {
    this.selectedCourse = course;
    this.courseDialog = true;
  }

  openStudents() {
    this.courseDialog = false;
    this.studentsDialog = true;
  }

  openExams() {
    this.courseDialog = false;
    this.examsDialog = true;
  }
}

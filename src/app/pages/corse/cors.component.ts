import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  templateUrl: 'corse.component.html',
   standalone: true,
   imports: [ DialogModule,ButtonModule,CardModule,TableModule,CommonModule]
})

export class CoursesComponent {

  courseDialog = false;
  studentsDialog = false;
  examsDialog = false;

  selectedCourse: any = null;

  courses = [
    {
      name: "مهندسی نرم افزار",
      code: "SE101",
      students: [
        { name: "علی رضایی", id: "981234567" },
        { name: "مهسا سلیمی", id: "991112233" }
      ],
      exams: [
        { date: "1403/10/12", type: "میان‌ترم" },
        { date: "1403/11/30", type: "پایان‌ترم" }
      ]
    },
    {
      name: "ساختمان داده",
      code: "DS204",
      students: [
        { name: "سارا محمدی", id: "981111222" },
        { name: "احمد اکبری", id: "991232323" }
      ],
      exams: [
        { date: "1403/9/28", type: "میان‌ترم" },
        { date: "1403/11/18", type: "پایان‌ترم" }
      ]
    }
  ];

  openCourse(course: any) {
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

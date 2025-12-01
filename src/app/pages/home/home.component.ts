import { Component, inject, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Router, RouterOutlet } from '@angular/router';
import { postResponsModel } from '../../app.model';
import { JsonPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from '../../layouts/navbar-layout';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import * as jalaali from 'jalaali-js';
import { DialogModule } from 'primeng/dialog';
import { JalaliDatepickerComponent } from '../detePicker.compomemt/datePiker.component';


@Component({
    selector: 'homeComponent',
    templateUrl: 'home.component.html',
    imports: [RouterOutlet,JsonPipe,ButtonModule,NavbarComponent,CardModule,TableModule,DatePickerModule,FormsModule,DialogModule,JalaliDatepickerComponent],
    providers: [AppService]
})

export class mainPageComponent  {
  router = inject(Router)
  today = jalaali.toJalaali(new Date());
  daysOfWeek = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
  calendarGrid: (number | null)[] = [];
  monthName:string = '';
  showDialog: boolean = false;

  newExam = {
    course: '',
    date: '',
    duration: 0,
    votes: 0
  };
  exams: {
    course: string;
    date: string;
    duration: number;
    votes: number;
  }[] = [];
 
  

  constructor() {
    const { jy, jm } = this.today;
    const daysInMonth = jalaali.jalaaliMonthLength(jy, jm);
    this.monthName = getPersianMonthName(jm);

    const firstGregorian = jalaali.toGregorian(jy, jm, 1);
    const firstDate = new Date(firstGregorian.gy, firstGregorian.gm - 1, firstGregorian.gd);
    const offset = (firstDate.getDay() + 1) % 7;

    for (let i = 0; i < offset; i++) {
      this.calendarGrid.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      this.calendarGrid.push(d);
    }
    
  }
  
  isToday(day: number | null): boolean {
    return day === this.today.jd;
  }
  openDialog() {
    this.showDialog = true;
  }

  onclicReservation(){
    this.router.navigate(['/RoomReservation'])
    
  }
  onclicSurvey(){
    this.router.navigate(['/SurveyComponent'])
  }

  saveExam() {

    this.exams.push({ ...this.newExam });
    this.newExam = { course: '', date: '', duration: 0, votes: 0 };
    this.showDialog = false;
    
  }

  vote(index: number, type: 'up' | 'down') {
    if (type === 'up') {
      this.exams[index].votes++;
    } else {
      this.exams[index].votes--;
    }
  }
  onDatePicked(date: string) {
    this.newExam.date = date; 
}

  
}
function getPersianMonthName(monthNumber: number): string {
  if (monthNumber === 1) {
    return 'فروردین';
  } else if (monthNumber === 2) {
    return 'اردیبهشت';
  } else if (monthNumber === 3) {
    return 'خرداد';
  } else if (monthNumber === 4) {
    return 'تیر';
  } else if (monthNumber === 5) {
    return 'مرداد';
  } else if (monthNumber === 6) {
    return 'شهریور';
  } else if (monthNumber === 7) {
    return 'مهر';
  } else if (monthNumber === 8) {
    return 'آبان';
  } else if (monthNumber === 9) {
    return 'آذر';
  } else if (monthNumber === 10) {
    return 'دی';
  } else if (monthNumber === 11) {
    return 'بهمن';
  } else if (monthNumber === 12) {
    return 'اسفند';
  } else {
    return 'ماه نامعتبر';
  }
}

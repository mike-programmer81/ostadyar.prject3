import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { OverlayModule } from 'primeng/overlay';
import { JalaliDatepickerComponent } from '../detePicker.compomemt/datePiker.component';
import * as jalaali from 'jalaali-js';

@Component({
  selector: 'home-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModule, OverlayModule, JalaliDatepickerComponent],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  // اطلاعات هر سالن
  reservations: {
    [key: string]: {
      lessonName: string;
      date: string;
      startTime: string;
      endTime: string;
    };
  } = {
    farabi: { lessonName: '', date: '', startTime: '', endTime: '' },
    ferdowsi: { lessonName: '', date: '', startTime: '', endTime: '' },
    saadi: { lessonName: '', date: '', startTime: '', endTime: '' },
    hafez: { lessonName: '', date: '', startTime: '', endTime: '' },
    khayyam: { lessonName: '', date: '', startTime: '', endTime: '' },
    molana: { lessonName: '', date: '', startTime: '', endTime: '' },
  };

  // وضعیت پاپ‌آپ‌ها
  overlayVisible: { [key: string]: boolean } = {
    farabi: false,
    ferdowsi: false,
    saadi: false,
    hafez: false,
    khayyam: false,
    molana: false
  };

  // لیست نهایی رزروهای ثبت‌شده
  savedReservations: {
    room: string;
    lessonName: string;
    date: string;
    startTime: string;
    endTime: string;
  }[] = [];

  // باز کردن پاپ‌آپ
  showOverlay(room: string, event: MouseEvent) {
    event.stopPropagation();
    Object.keys(this.overlayVisible).forEach(key => {
      this.overlayVisible[key] = key === room ? !this.overlayVisible[key] : false;
    });
  }

  // بستن پاپ‌آپ با کلیک بیرون
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const inside = target.closest('.p-overlay, button, input, .calendar-panel');
    if (!inside) {
      Object.keys(this.overlayVisible).forEach(key => (this.overlayVisible[key] = false));
    }
  }

  // وقتی تاریخ از تقویم شمسی انتخاب شد
  onDateSelected(room: string, date: string) {
    this.reservations[room].date = date;
  }

  // ذخیره اطلاعات سالن
  saveDateTime(room: string) {
    const r = this.reservations[room];

    // اگر اطلاعات کامل نبود
    if (!r.lessonName || !r.date || !r.startTime || !r.endTime) {
      alert('لطفاً تمام فیلدها را پر کنید');
      return;
    }

    // اضافه به لیست نهایی
    this.savedReservations.push({
      room,
      lessonName: r.lessonName,
      date: r.date,
      startTime: r.startTime,
      endTime: r.endTime
    });

    // بستن پاپ‌آپ
    this.overlayVisible[room] = false;

    // پاک کردن مقادیر برای ورود بعدی
    this.reservations[room] = { lessonName: '', date: '', startTime: '', endTime: '' };
  }
}

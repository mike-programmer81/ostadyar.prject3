import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SurveyService } from '../services/survey.service';
import { Router } from '@angular/router';
import { Survey } from '../../models/survey.model';

@Component({
  selector: 'app-create-survey',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-4 max-w-xl mx-auto">

      <h2 class="text-xl font-bold mb-4">ایجاد نظرسنجی جدید</h2>

      <label class="font-semibold">عنوان نظرسنجی</label>
      <input
        class="border p-2 w-full rounded mb-3"
        [(ngModel)]="title"
        placeholder="مثال: بهترین زمان برگزاری امتحان"
      />

      <label class="font-semibold">توضیحات (اختیاری)</label>
      <textarea
        class="border p-2 w-full rounded mb-3"
        [(ngModel)]="description"
        placeholder="توضیح کوتاه درباره نظرسنجی"
      ></textarea>

      <h3 class="font-semibold mt-4 mb-2">اضافه کردن گزینه‌ها:</h3>

      <div *ngFor="let opt of options; let i = index" class="flex gap-2 mb-2">
        <input
          class="border p-2 flex-1 rounded"
          [(ngModel)]="options[i]"
          placeholder="گزینه رأی‌دهی"
        />
        <button
          class="bg-red-500 text-white px-3 rounded"
          (click)="removeOption(i)"
        >
          حذف
        </button>
      </div>

      <button
        class="bg-gray-700 text-white px-4 py-1 rounded mb-4"
        (click)="addOption()"
      >
        + افزودن گزینه
      </button>

      <button
        class="bg-blue-600 text-white p-2 rounded w-full"
        (click)="create()"
      >
        ثبت نظرسنجی
      </button>
    </div>
  `
})
export class SurveyCreatePage {

  title = '';
  description = '';
  options: string[] = [''];

  surveyService = inject(SurveyService);
  router = inject(Router);

  addOption() {
    this.options.push('');
  }

  removeOption(index: number) {
    this.options.splice(index, 1);
  }

  create() {
    const cleanOptions = this.options.filter(o => o.trim() !== '');

    if (!this.title.trim() || cleanOptions.length === 0) {
      alert('عنوان و حداقل یک گزینه لازم است');
      return;
    }

    const newSurvey: Omit<Survey, 'id'> = {
      title: this.title.trim(),
      description: this.description.trim(),
      options: cleanOptions,
      votes: Array(cleanOptions.length).fill(0)
    };

    this.surveyService.createSurvey(newSurvey);

    alert('نظرسنجی با موفقیت ایجاد شد');
    this.router.navigate(['/survey']);
  }
}

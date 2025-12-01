import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { SurveyService } from '../services/survey.service';
import { Survey } from '../../models/survey.model';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-survey-list',
  standalone: true,
  imports: [CommonModule, RouterModule, CardModule, ButtonModule, Toast],
  template: `
    <div class="p-4 max-w-5xl mx-auto">

      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">لیست نظرسنجی‌ها</h2>

        <button   pButton  label="ایجاد نظرسنجی جدید" class="p-button-success"(click)="goToCreate()"> </button>
      </div>

      <div *ngIf="surveys$ | async as surveys; else loading">
        
        <ng-container *ngIf="surveys.length > 0; else noSurveys"> 

          <div *ngFor="let s of surveys" class="mb-4">
            <p-card>
              <div class="flex justify-between items-start">

                <div>
                  <h3 class="text-lg font-semibold mb-1">{{ s.title }}</h3>
                  <p class="text-sm text-gray-600" *ngIf="s.description">
                    {{ s.description }}
                  </p>
                </div>

                <button 
                  pButton 
                  type="button" 
                  label="مشاهده / رأی"
                  class="p-button-outlined p-button-success"
                  (click)="openSurvey(s.id)">
                </button>

              </div>
            </p-card>
          </div>

        </ng-container>

      </div>

      <ng-template #loading>
        <p>در حال بارگذاری...</p>
      </ng-template>

      <ng-template #noSurveys>
        <p class="text-gray-600">هنوز هیچ نظرسنجی‌ای ثبت نشده است.</p>
      </ng-template>

    </div>
  `,
  providers: [MessageService]
})
export class SurveyListPage {

  private surveyService = inject(SurveyService);
  private router = inject(Router);

  surveys$: Observable<Survey[]> = this.surveyService.getSurveys();

  goToCreate() {
    this.router.navigate(['/survey/create']);
  }

  // openSurvey(id: string) {
  //   this.router.navigate(['/survey', id]);
  // }
  openSurvey(id: any) {
  console.log("Survey ID = ", id);
  this.router.navigate(['/survey', id]);
}

}

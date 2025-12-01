import { Injectable } from '@angular/core';
import { Survey } from '../../models/survey.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private surveys: Survey[] = [];

  createSurvey(survey: Omit<Survey, 'id'>) {
    const newSurvey: Survey = {
      id: crypto.randomUUID(),
      ...survey
    };
    // اضافه کردن فیلد votes به صورت آرایه بر اساس تعداد گزینه‌ها
    newSurvey.votes = newSurvey.options.map(() => 0);
    this.surveys.push(newSurvey);
  }

  // برگرداندن همه نظرسنجی‌ها به صورت Observable
  getSurveys(): Observable<Survey[]> {
    return of(this.surveys);
  }

  // برگرداندن یک نظرسنجی تکی به صورت Observable
  getSurveyById(id: string): Observable<Survey | undefined> {
    const survey = this.surveys.find(s => s.id === id);
    return of(survey);
  }

  // رأی دادن به یک گزینه
  vote(id: string, optionIndex: number): Observable<void> {
    const survey = this.surveys.find(s => s.id === id);
    if (survey && survey.votes && survey.votes[optionIndex] !== undefined) {
      survey.votes[optionIndex]++;
    }
    return of(undefined);
  }
}

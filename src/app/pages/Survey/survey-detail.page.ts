import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../services/survey.service';
import { Survey } from '../../models/survey.model';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.page.html',
  styleUrls: ['./survey.detail.page.css']
})
export class SurveyDetailPage implements OnInit {

  survey?: Survey;
  showResults = false;

  constructor(
    private route: ActivatedRoute,
    private surveyService: SurveyService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      // گرفتن نظرسنجی با subscribe
      this.surveyService.getSurveyById(id).subscribe(survey => {
        if (!survey) {
          console.error(`No survey found with ID: ${id}`);
        } else {
          this.survey = survey;
        }
      });
    }
  }

  vote(index: number) {
    if (!this.survey) {
      console.error('Cannot vote: Survey object is missing.');
      return;
    }

    // رأی دادن با subscribe
    this.surveyService.vote(this.survey.id, index).subscribe(() => {
      // بعد از رأی دادن، دوباره نظرسنجی را از سرویس بگیریم تا آمار بروزرسانی شود
      this.surveyService.getSurveyById(this.survey!.id).subscribe(updatedSurvey => {
        if (updatedSurvey) {
          this.survey = updatedSurvey;
          this.showResults = true;
          alert('رأی شما ثبت شد ✅');
        }
      });
    });
  }

  // --- توابع کمکی ---
  get totalVotes(): number {
    return this.survey ? this.survey.votes.reduce((a, b) => a + b, 0) : 0;
  }

  getVotePercent(index: number): number {
    if (!this.survey || this.totalVotes === 0) return 0;
    return (this.survey.votes[index] / this.totalVotes) * 100;
  }
}

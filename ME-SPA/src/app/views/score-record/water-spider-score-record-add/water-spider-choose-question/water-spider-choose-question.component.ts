import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ScoreRecordService } from '../../../../_core/_services/score-record.service';
import { ScoreRecordQuestion } from '../../../../_core/_models/score-record-question';

@Component({
  selector: 'app-water-spider-choose-question',
  templateUrl: './water-spider-choose-question.component.html',
  styleUrls: ['./water-spider-choose-question.component.scss']
})
export class WaterSpiderChooseQuestionComponent implements OnInit {
  remake: boolean = false;
  questions: ScoreRecordQuestion[] = [];
  constructor(private scoreService: ScoreRecordService) {}

  ngOnInit() {
    this.loadQuestion();
  }

  loadQuestion() {
    const auditType1 = '精實系統/WS';
    const auditType2 = '';
    this.scoreService.getQuestion(auditType1, auditType2).subscribe(res => {
      this.questions = res;
    });
  }

  checkChange(item: ScoreRecordQuestion, number) {
    if (number === 0) {
      item.rating_0 = 1;
      item.rating_1 = 0;
      item.rating_2 = 0;
      item.rating_Na = 0;
      item.remark = '';
    }
    if (number === 1) {
      item.rating_0 = 0;
      item.rating_1 = 1;
      item.rating_2 = 0;
      item.rating_Na = 0;
      item.remark = '';
    }
    if (number === 2) {
      item.rating_0 = 0;
      item.rating_1 = 0;
      item.rating_2 = 1;
      item.rating_Na = 0;
      item.remark = '';
    }
    if (number === 3) {
      item.rating_0 = 0;
      item.rating_1 = 0;
      item.rating_2 = 0;
      item.rating_Na = 1;
      item.remark = '';
    }
  }

}

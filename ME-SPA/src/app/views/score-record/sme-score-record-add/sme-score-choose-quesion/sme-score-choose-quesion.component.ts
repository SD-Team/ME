import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sme-score-choose-quesion',
  templateUrl: './sme-score-choose-quesion.component.html',
  styleUrls: ['./sme-score-choose-quesion.component.scss']
})
export class SmeScoreChooseQuesionComponent implements OnInit {

  @Output() QuestionEvent = new EventEmitter<boolean>();
  question = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }
  sendquestion() {
    this.QuestionEvent.emit(this.question);
  }
  hideQuestion() {
    this.question = true;
    this.sendquestion();
  }
  back() {
    this.router.navigate(['maintenance/sme-score-record']);
  }

}

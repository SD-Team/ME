import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-water-spider-choose-question',
  templateUrl: './water-spider-choose-question.component.html',
  styleUrls: ['./water-spider-choose-question.component.scss']
})
export class WaterSpiderChooseQuestionComponent implements OnInit {

  @Output() QuestionEvent = new EventEmitter<boolean>();
  question = false;
  constructor(private router:Router) { }

  ngOnInit() {
  }
  back() {
    this.router.navigate(['maintenance/6s-score-record']);
  }
  sendquestion() {
    this.QuestionEvent.emit(this.question);
  }
  hideQuestion(){
    this.question=true;
    this.sendquestion();
  }

}

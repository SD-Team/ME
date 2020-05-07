import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sixs-recored-choose-quesion',
  templateUrl: './sixs-recored-choose-quesion.component.html',
  styleUrls: ['./sixs-recored-choose-quesion.component.scss']
})
export class SixsRecoredChooseQuesionComponent implements OnInit {
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

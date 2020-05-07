import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-sixs-recored-choose-quesion',
  templateUrl: './sixs-recored-choose-quesion.component.html',
  styleUrls: ['./sixs-recored-choose-quesion.component.scss']
})
export class SixsRecoredChooseQuesionComponent implements OnInit {
  remake: boolean = false;
  text:any;
  question = false;
  @Output() QuestionEvent = new EventEmitter<boolean>();
  constructor() {}
  ngOnInit() {
  }
  changText(number) {
    console.log(this.text);
    if (number == 1) {
      this.remake = true;
    } else {
      this.remake = false;
    }
  }
  sendquestion() {
    this.QuestionEvent.emit(this.question);
  }
  backList() {
    this.question=false;
    this.sendquestion();
  }
}

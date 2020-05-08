import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sme-score-choose-quesion',
  templateUrl: './sme-score-choose-quesion.component.html',
  styleUrls: ['./sme-score-choose-quesion.component.scss']
})
export class SmeScoreChooseQuesionComponent implements OnInit {

  remake: boolean = false;
  text:any;
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
}

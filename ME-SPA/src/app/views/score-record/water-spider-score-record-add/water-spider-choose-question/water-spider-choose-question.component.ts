import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-water-spider-choose-question',
  templateUrl: './water-spider-choose-question.component.html',
  styleUrls: ['./water-spider-choose-question.component.scss']
})
export class WaterSpiderChooseQuestionComponent implements OnInit {
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

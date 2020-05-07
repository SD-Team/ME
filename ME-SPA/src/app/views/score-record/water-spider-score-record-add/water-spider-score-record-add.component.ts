import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-water-spider-score-record-add',
  templateUrl: './water-spider-score-record-add.component.html',
  styleUrls: ['./water-spider-score-record-add.component.scss']
})
export class WaterSpiderScoreRecordAddComponent implements OnInit {

  remake: boolean = false;
  text:any;
  question:false;
  constructor() {}

  ngOnInit() {}
  changText(number) {
    console.log(this.text);
    if (number == 1) {
      this.remake = true;
    } else {
      this.remake = false;
    }
  }
  receiveQuestion($event)
  {
    this.question = $event;
  }
}

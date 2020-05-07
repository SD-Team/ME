import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sme-score-record-add',
  templateUrl: './sme-score-record-add.component.html',
  styleUrls: ['./sme-score-record-add.component.scss']
})
export class SmeScoreRecordAddComponent implements OnInit {
  remake: boolean = false;
  text: any;
  question: false;
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
  receiveQuestion($event) {
    this.question = $event;
  }

}

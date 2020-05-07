import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-water-spider-score-record-add',
  templateUrl: './water-spider-score-record-add.component.html',
  styleUrls: ['./water-spider-score-record-add.component.scss']
})
export class WaterSpiderScoreRecordAddComponent implements OnInit {

  question = false;
  constructor(private router:Router) { }

  ngOnInit() {}

  back() {
    this.router.navigate(['maintenance/6s-score-record']);
  }

  hideQuestion(){
    this.question=true;
  }
  receiveQuestion($event)
  {
    this.question = $event;
  }
}

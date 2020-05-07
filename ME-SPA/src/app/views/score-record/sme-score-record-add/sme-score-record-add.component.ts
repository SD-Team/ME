import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sme-score-record-add',
  templateUrl: './sme-score-record-add.component.html',
  styleUrls: ['./sme-score-record-add.component.scss']
})
export class SmeScoreRecordAddComponent implements OnInit {
  question = false;
  constructor(private router: Router) { }

  ngOnInit() {}

  back() {
    this.router.navigate(['maintenance/sme-score-record']);
  }

  hideQuestion(){
    this.question=true;
  }
  receiveQuestion($event)
  {
    this.question = $event;
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-water-spider-score-record-add',
  templateUrl: './water-spider-score-record-add.component.html',
  styleUrls: ['./water-spider-score-record-add.component.scss']
})
export class WaterSpiderScoreRecordAddComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user'));
  today: Date = new Date();
  constructor(private router:Router) { }

  ngOnInit() {}

  back() {
    this.router.navigate(['maintenance/water-spider-score-record']);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sme-score-record-add',
  templateUrl: './sme-score-record-add.component.html',
  styleUrls: ['./sme-score-record-add.component.scss']
})
export class SmeScoreRecordAddComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user'));
  today: Date = new Date();
  constructor(private router: Router) { }

  ngOnInit() {}

  back() {
    this.router.navigate(['maintenance/sme-score-record']);
  }
}

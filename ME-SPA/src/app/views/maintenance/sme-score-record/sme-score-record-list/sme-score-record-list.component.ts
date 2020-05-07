import { Pagination } from './../../../../_core/_models/pagination';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sme-score-record-list',
  templateUrl: './sme-score-record-list.component.html',
  styleUrls: ['./sme-score-record-list.component.scss']
})
export class SmeScoreRecordListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  add() {
    this.router.navigate(['/record/record-add/sms-scored-record-add']);
  }

}

import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../../_core/_models/pagination';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-water-spider-score-record-list',
  templateUrl: './water-spider-score-record-list.component.html',
  styleUrls: ['./water-spider-score-record-list.component.scss']
})
export class WaterSpiderScoreRecordListComponent implements OnInit {

  pagination: Pagination;
  constructor( private spinner: NgxSpinnerService

              ) { }

  ngOnInit() {
  }
  pageChanged(){
    
  }
}

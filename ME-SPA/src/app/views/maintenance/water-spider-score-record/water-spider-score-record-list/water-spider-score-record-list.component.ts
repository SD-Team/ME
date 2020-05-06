import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../../_core/_models/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditType } from '../../../../_core/_models/audit-type';

@Component({
  selector: 'app-water-spider-score-record-list',
  templateUrl: './water-spider-score-record-list.component.html',
  styleUrls: ['./water-spider-score-record-list.component.scss']
})
export class WaterSpiderScoreRecordListComponent implements OnInit {
  pagination: Pagination;
  timeStart : string;
  timeEnd : string;
  pdc : string;line : string;building : string; auditType2 :string;
  pdcList: string[] = [];
  lines: string[] = [];
  buildings: string[] = [];
  constructor( private spinner: NgxSpinnerService

              ) { }

  ngOnInit() {
  }
  pageChanged(){

  }
}

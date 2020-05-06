import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from '../../../../_core/_models/pagination';
import { AuditType } from '../../../../_core/_models/audit-type';
@Component({
  selector: 'app-sixs-score-record-list',
  templateUrl: './sixs-score-record-list.component.html',
  styleUrls: ['./sixs-score-record-list.component.scss']
})
export class SixsScoreRecordListComponent implements OnInit {
  pagination: Pagination;
  timeStart : string;
  timeEnd : string;
  pdc : string;line : string;building : string; auditType2 :string;
  pdcList: string[] = [];
  lines: string[] = [];
  buildings: string[] = [];
  auditType2List: AuditType[];
  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }
  pageChanged(){

  }
}

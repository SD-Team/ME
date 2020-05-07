import { SmeScoreRecordService } from './../../../../_core/_services/sme-score-record.service';
import { ScoreRecordService } from './../../../../_core/_services/score-record.service';
import { Pagination } from './../../../../_core/_models/pagination';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-sme-score-record-list',
  templateUrl: './sme-score-record-list.component.html',
  styleUrls: ['./sme-score-record-list.component.scss']
})
export class SmeScoreRecordListComponent implements OnInit {

  pagination: Pagination;
  timeStart: string;
  timeEnd: string;
  pdc: string; line: string; building: string; auditType2: string;
  pdcList: string[] = [];
  lines: string[] = [];
  buildings: string[] = [];
  auditType2List: string[] = [];
  constructor(private smeScoreRecordService: SmeScoreRecordService ,
              private spinner: NgxSpinnerService,
              private router: Router) { }

  ngOnInit() {
    this.getListPDCs();
    this.getListBuilding();
    this.getListLine();
    this.getListAuditType2();
  }
  getListPDCs() {
    this.smeScoreRecordService.getListPDC().subscribe(res => {
      this.pdcList = res;
      this.pdc = this.pdcList[0];
    });
  }
  getListBuilding() {
    this.smeScoreRecordService.getListBuilding().subscribe(res => {
      this.buildings = res;
      this.building = this.buildings[0];
    });
  }
  getListLine() {
    this.smeScoreRecordService.getListLine().subscribe(res => {
      this.lines = res;
      this.line = this.lines[0];
    });
  }

  getListAuditType2() {
    this.smeScoreRecordService.getAuditType2().subscribe(res => {
      this.auditType2List = res;
      this.auditType2 = this.auditType2List[0];
    });
  }

  pageChanged() {

  }
  add() {
    this.router.navigate(['/record/record-add/sms-scored-record-add']);
  }

}

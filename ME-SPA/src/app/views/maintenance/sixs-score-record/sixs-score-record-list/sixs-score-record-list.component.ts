import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from '../../../../_core/_models/pagination';
import { ScoreRecordService } from '../../../../_core/_services/score-record.service';
import { Router } from '@angular/router';

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
  auditType2List: string[] =[];
  constructor(private scoreRecordService: ScoreRecordService,
              private spinner: NgxSpinnerService,
              private router: Router) { }

  ngOnInit() {
    this.getListPDCs();
    this.getListBuilding();
    this.getListLine();
    this.optionAuditType2();
  }
  getListPDCs() {
    this.scoreRecordService.getListPDC().subscribe(res => {
      this.pdcList = res;
      this.pdc = this.pdcList[0];
    });
  }
  getListBuilding() {
    this.scoreRecordService.getListBuilding().subscribe(res => {
      this.buildings = res;
      this.building = this.buildings[0];
    });
  }
  getListLine() {
    this.scoreRecordService.getListLine().subscribe(res => {
      this.lines = res;
      this.line = this.lines[0];
    });
  }
  optionAuditType2() {
    // var auditType1 ='6S';
    // // tslint:disable-next-line:no-var-keyword
    // const object = {
    //   audit_type_1: auditType1
    // };
      this.scoreRecordService.getAuditType2().subscribe(res => {
        this.auditType2List = res;
        debugger;
        this.auditType2 = this.auditType2List[0];
      });
  }
  pageChanged(){

  }
  addNew() {
    this.router.navigate(['/record/record-add/6s-scored-record-add']);
  }
}

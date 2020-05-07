import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../../_core/_models/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScoreRecordService } from '../../../../_core/_services/score-record.service';
import { Router } from '@angular/router';

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
  constructor(
    private scoreRecordservice: ScoreRecordService,
      private router:Router,
     private spinner: NgxSpinnerService

              ) { }

  ngOnInit() {
    this.getListPDCs();
    this.getListBuilding();
    this.getListLine();
  }
  getListPDCs() {
    this.scoreRecordservice.getListPDC().subscribe(res => {
      this.pdcList = res;
      this.pdc = this.pdcList[0];
    });
  }
  getListBuilding() {
    this.scoreRecordservice.getListBuilding().subscribe(res => {
      this.buildings = res;
      this.building = this.buildings[0];
    });
  }
  getListLine() {
    this.scoreRecordservice.getListLine().subscribe(res => {
      this.lines = res;
      this.line = this.lines[0];
    });
  }
  pageChanged(){

  }
  addNew() {
    this.router.navigate(['/record/record-add/water-spider-scored-record-add']);
  }
}

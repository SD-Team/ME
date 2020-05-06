import { Component, OnInit } from '@angular/core';
import { Pagination } from '../../../../_core/_models/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditTypeService } from '../../../../_core/_services/audit-type.service';
import { AuditRecMService } from '../../../../_core/_services/audit-rec-m.service';
import { AuditRecDService } from '../../../../_core/_services/audit-rec-d.service';

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
    private auditRecDService: AuditRecDService,
    private auditRecMService: AuditRecMService,
     private auditTypeMService: AuditTypeService,
     private spinner: NgxSpinnerService

              ) { }

  ngOnInit() {
    this.getListPDCs();
    this.getListBuilding();
    this.getListLine();
  }
  getListPDCs() {
    this.auditRecMService.getListPDC().subscribe(res => {
      this.pdcList = res;
      this.pdc = this.pdcList[0];
    });
  }
  getListBuilding() {
    this.auditRecMService.getListBuilding().subscribe(res => {
      this.buildings = res;
      this.building = this.buildings[0];
    });
  }
  getListLine() {
    this.auditRecMService.getListLine().subscribe(res => {
      this.lines = res;
      this.line = this.lines[0];
    });
  }
  pageChanged(){

  }
}

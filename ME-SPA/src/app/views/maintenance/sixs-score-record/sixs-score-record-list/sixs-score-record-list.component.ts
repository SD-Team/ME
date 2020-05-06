import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from '../../../../_core/_models/pagination';
import { AuditType } from '../../../../_core/_models/audit-type';
import { AuditTypeService } from '../../../../_core/_services/audit-type.service';
import { AuditRecMService } from '../../../../_core/_services/audit-rec-m.service';
import { AuditRecDService } from '../../../../_core/_services/audit-rec-d.service';
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
  constructor(private auditRecDService: AuditRecDService,
             private auditRecMService: AuditRecMService,
              private auditTypeMService: AuditTypeService,
              private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getListPDCs();
    this.getListBuilding();
    this.getListLine();
    this.optionAuditType1();
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
  optionAuditType1() {
    var auditType1 ='6S';
    // tslint:disable-next-line:no-var-keyword
    const object = {
      audit_type_1: auditType1
    };
      this.auditTypeMService.getAuditsByAuditType1(object).subscribe(res => {
        this.auditType2List = res;
        this.auditType2 = this.auditType2List[0].audit_Type2;
      });
  }
  pageChanged(){

  }
}

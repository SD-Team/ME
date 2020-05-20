import { AuditRateSearch } from './../../../../_core/_models/audit-rate-search';
import { SmeScoreRecordService } from './../../../../_core/_services/sme-score-record.service';
import { AlertifyService } from './../../../../_core/_services/alertify.service';
import { AuditRateSme } from './../../../../_core/_models/audit-rate-sme';
import { Pagination, PaginatedResult } from './../../../../_core/_models/pagination';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FunctionUtility } from '../../../../_core/_utility/function-utility';


@Component({
  selector: 'app-sme-score-record-list',
  templateUrl: './sme-score-record-list.component.html',
  styleUrls: ['./sme-score-record-list.component.scss']
})
export class SmeScoreRecordListComponent implements OnInit {
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 3,
    totalItems: 1,
    totalPages: 1,
  };
  timeStart: string = "";
  timeEnd: string = "";
  fromTime: string = "";
  toTime: string = "";
  pdc: string = "";
  line: string = "";
  building: string = "";
  auditType2: string = "";
  pdcList: any[] = [];
  lines: any[] = [];
  buildings: any[] = [];
  auditType2List: any[] = [];
  auditRateSme: AuditRateSme[] = [];
  searchKey = false;
  text: string;
  constructor(
    private smeScoreRecordService: SmeScoreRecordService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertify: AlertifyService,
    private functionUtility: FunctionUtility
  ) { }

  ngOnInit() {
    this.spinner.show();
    this.getListPDCs();
    this.getListBuilding();
    this.getListLine();
    this.optionAuditType2();
    this.loadData();
    this.spinner.hide();
  }
  loadData() {
    let object = {
      pdc: this.pdc,
      building: this.building,
      line: this.line,
      auditType2: this.auditType2,
      fromDate: this.fromTime,
      toDate: this.toTime,
    };
    this.smeScoreRecordService.search(this.pagination.currentPage, this.pagination.itemsPerPage, object).subscribe(
      (res: PaginatedResult<AuditRateSme[]>) => {
        this.auditRateSme = res.result;
        this.pagination = res.pagination;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
  }
  getListPDCs() {
    this.smeScoreRecordService.getListPDC().subscribe((res) => {
      this.pdcList = res.map((item) => {
        return { id: item, text: item };
      });
      this.pdcList.unshift({ id: "", text: "All" });
    });
  }
  getListBuilding() {
    this.smeScoreRecordService.getListBuilding().subscribe((res) => {
      this.buildings = res.map((item) => {
        if (item.trim() != "")
          return { id: item, text: item };
      });
      this.buildings.unshift({ id: "", text: "All" });
    });
  }
  getListLine() {
    this.smeScoreRecordService.getListLine().subscribe((res) => {
      this.lines = res.map((item) => {
        if (item.trim() != "")
          return { id: item, text: item };
      });
      this.lines.unshift({ id: "", text: "All" });
    });
  }
  optionAuditType2() {
    this.smeScoreRecordService.getAuditType2().subscribe((res) => {
      this.auditType2List = res.map((item) => {
        if (item.trim() != "") {
          return { id: item, text: item };
        }
      });
      this.auditType2List.unshift({ id: "", text: "All" });
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }
  addNew() {
    this.router.navigate(["/record/record-add/sms-scored-record-add"]);
  }
  search() {
    this.checkTime();
    this.spinner.show();
    this.pagination.currentPage = 1;
    this.loadData();
    this.spinner.hide();
  }

  detail(recordId) {
    this.router.navigate(["/maintenance/sme-score-record/detail/" + recordId]);
  }

  exportExcel() {
  this.checkTime();
    let object = {
      pdc: this.pdc,
      building: this.building,
      line: this.line,
      auditType2: this.auditType2,
      fromDate: this.fromTime,
      toDate: this.toTime,
    };
    this.smeScoreRecordService.exportExcel(object);
  }

  clearSearch() {
    this.pdc = "";
    this.building = "";
    this.line = "";
    this.auditType2 = "";
    this.timeEnd = "";
    this.timeStart = "";
    this.fromTime="";
    this.toTime="";
    this.loadData();
  }

  checkTime() {
    if (this.timeStart === '' || this.timeEnd === '' || this.timeStart === null || this.timeEnd === null || new Date(this.timeStart).getTime() > new Date(this.timeEnd).getTime()) {
      this.toTime = '';
      this.fromTime = '';
    }
    else {
      this.fromTime = this.functionUtility.getDateFormat(new Date(this.timeStart));
      this.toTime = this.functionUtility.getDateFormat(new Date(this.timeEnd));
    }
  }

}

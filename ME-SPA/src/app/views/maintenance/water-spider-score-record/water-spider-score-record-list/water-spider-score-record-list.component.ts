import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../../../../_core/_models/pagination';
import { NgxSpinnerService } from 'ngx-spinner';
import { ScoreRecordService } from '../../../../_core/_services/score-record.service';
import { Router } from '@angular/router';
import { WaterSpiderScoreRecordService } from '../../../../_core/_services/water-spider-score-record.service';
import { AuditRateWaterSpider } from '../../../../_core/_models/audit-rate-water-spider';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { FunctionUtility } from '../../../../_core/_utility/function-utility';

@Component({
  selector: 'app-water-spider-score-record-list',
  templateUrl: './water-spider-score-record-list.component.html',
  styleUrls: ['./water-spider-score-record-list.component.scss'],
})
export class WaterSpiderScoreRecordListComponent implements OnInit {
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 3,
    totalItems: 1,
    totalPages: 1,
  };
  timeStart: string = '';
  timeEnd: string = '';
  fromTime: string = '';
  toTime: string = '';
  pdc: string = '';
  line: string = '';
  building: string = '';
  pdcList: any[] = [];
  lines: any[] = [];
  buildings: any[] = [];
  auditRateWaterSpider: AuditRateWaterSpider[] = [];
  constructor(
    private scoreRecordservice: ScoreRecordService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private waterSpiderService: WaterSpiderScoreRecordService,
    private alertifyService: AlertifyService,
    private functionUtility: FunctionUtility
  ) { }

  ngOnInit() {
    this.getListPDCs();
    this.getListBuilding();
    this.getListLine();
    this.loadData()
  }
  getListPDCs() {
    this.scoreRecordservice.getListPDC().subscribe((res) => {
      this.pdcList = res.map((item) => {
        return { id: item, text: item };
      });
      this.pdcList.unshift({ id: '', text: 'All' });
    });
  }
  getListBuilding() {
    this.scoreRecordservice.getListBuilding().subscribe((res) => {
      this.buildings = res.map((item) => {
        return { id: item, text: item };
      });
      this.buildings.unshift({ id: '', text: 'All' });
    });
  }
  getListLine() {
    this.scoreRecordservice.getListLine().subscribe((res) => {
      this.lines = res.map((item) => {
        return { id: item, text: item };
      });
      this.lines.unshift({ id: '', text: 'All' });
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadData();
  }
  addNew() {
    this.router.navigate(['/record/record-add/water-spider-scored-record-add']);
  }
  loadData() {
    let object = {
      pdc: this.pdc,
      building: this.building,
      line: this.line,
      fromDate: this.fromTime,
      toDate: this.toTime,
      auditType2: ''
    };
    this.waterSpiderService.search(this.pagination.currentPage, this.pagination.itemsPerPage, object).subscribe(
      (res: PaginatedResult<AuditRateWaterSpider[]>) => {
        this.auditRateWaterSpider = res.result;
        this.pagination = res.pagination;
      },
      (error) => {
        this.alertifyService.error(error);
      }
    );
  }

  search() {
    this.spinner.show();
    if (this.timeStart === '' || this.timeEnd === '' || this.timeStart === null || this.timeEnd === null ) {
      this.toTime = '';
      this.fromTime = '';
    }
    else {
      this.fromTime = this.functionUtility.getDateFormat(new Date(this.timeStart));
      this.toTime = this.functionUtility.getDateFormat(new Date(this.timeEnd));
    }
    this.pagination.currentPage = 1;
    this.loadData();
    this.spinner.hide();
  }
  exportExcel() {
    this.spinner.show();
    if (this.timeStart === '' || this.timeEnd === '' || this.timeStart === null || this.timeEnd === null ) {
      this.toTime = '';
      this.fromTime = '';
    }
    else {
      this.fromTime = this.functionUtility.getDateFormat(new Date(this.timeStart));
      this.toTime = this.functionUtility.getDateFormat(new Date(this.timeEnd));
    }
    let object = {
      pdc: this.pdc,
      building: this.building,
      line: this.line,
      fromDate: this.fromTime,
      toDate: this.toTime,
      auditType2: ''
    };
    this.waterSpiderService.exportExcel(object);
   this.spinner.hide();
  }

  detail(recordId: string) {
    this.router.navigate(['/maintenance/water-spider-score-record/detail', recordId]);
  }

  clearSearch(){
   this.pdc = "";
    this.building = "";
    this.line = "";
    this.timeEnd = "";
    this.timeStart = "";
  }

}

import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Pagination, PaginatedResult,} from "../../../../_core/_models/pagination";
import { ScoreRecordService } from "../../../../_core/_services/score-record.service";
import { Router } from "@angular/router";
import { AuditRate6S } from "../../../../_core/_models/audit-rate-6s";
import { AlertifyService } from "../../../../_core/_services/alertify.service";

@Component({
  selector: "app-sixs-score-record-list",
  templateUrl: "./sixs-score-record-list.component.html",
  styleUrls: ["./sixs-score-record-list.component.scss"],
})
export class SixsScoreRecordListComponent implements OnInit {
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
  auditRate6S: AuditRate6S[] = [];
  constructor(
    private scoreRecordService: ScoreRecordService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

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
    this.spinner.show();
    let object = {
      pdc: this.pdc,
      building: this.building,
      line: this.line,
      auditType2: this.auditType2,
      fromDate: this.fromTime,
      toDate: this.toTime,
    };
    this.scoreRecordService.search(this.pagination.currentPage, this.pagination.itemsPerPage, object).subscribe(
      (res: PaginatedResult<AuditRate6S[]>) => {
        this.auditRate6S = res.result;
        this.pagination = res.pagination;
      },
      (error) => {
        this.alertify.error(error);
      }
    );
    this.spinner.hide();
  }
  getListPDCs() {
    this.scoreRecordService.getListPDC().subscribe((res) => {
      this.pdcList = res.map((item) => {
        return { id: item, text: item };
      });
      this.pdcList.unshift({ id: "", text: "All" });
    });
  }
  getListBuilding() {
    this.scoreRecordService.getListBuilding().subscribe((res) => {
      this.buildings = res.map((item) => {
        return { id: item, text: item };
      });
      this.buildings.unshift({ id: "", text: "All" });
    });
  }
  getListLine() {
    this.scoreRecordService.getListLine().subscribe((res) => {
      this.lines = res.map((item) => {
        return { id: item, text: item };
      });
      this.lines.unshift({ id: "", text: "All" });
    });
  }
  optionAuditType2() {
    this.scoreRecordService.getAuditType2().subscribe((res) => {
      this.auditType2List = res.map((item) => {
        return { id: item, text: item };
      });
      this.auditType2List.unshift({ id: "", text: "All" });
    });
  }
  pageChanged(event: any): void {

    this.pagination.currentPage = event.page;

   this.loadData();

  }
  addNew() {
    this.router.navigate(["/record/record-add/6s-scored-record-add"]);
  }
  search() {
    if (this.timeStart == "" || this.timeEnd == "") {
      this.alertify.error("Please option start and end time");
    } else {
      this.spinner.show();
      this.fromTime = new Date(this.timeStart).toLocaleDateString();
      // tslint:disable-next-line:prefer-const
      this.toTime = new Date(this.timeEnd).toLocaleDateString();
      this.pagination.currentPage=1;
      this.loadData();
      this.spinner.hide();
    }
  }

  exportExcel() {
    let object = {
      pdc: this.pdc,
      building: this.building,
      line: this.line,
      auditType2: this.auditType2,
      fromDate: this.fromTime,
      toDate: this.toTime,
    };
    this.scoreRecordService.exportExcel(object);
  }
  changeToDetail(){
    this.router.navigate(["maintenance/6s-score-record/detail/1"]);
  }
}

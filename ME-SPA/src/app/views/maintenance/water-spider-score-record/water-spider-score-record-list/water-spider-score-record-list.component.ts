import { Component, OnInit } from "@angular/core";
import { Pagination } from "../../../../_core/_models/pagination";
import { NgxSpinnerService } from "ngx-spinner";
import { ScoreRecordService } from "../../../../_core/_services/score-record.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-water-spider-score-record-list",
  templateUrl: "./water-spider-score-record-list.component.html",
  styleUrls: ["./water-spider-score-record-list.component.scss"],
})
export class WaterSpiderScoreRecordListComponent implements OnInit {
  pagination: Pagination;
  timeStart: string;
  timeEnd: string;
  pdc: string = "";
  line: string = "";
  building: string = "";
  auditType2: string = "";
  pdcList: any[] = [];
  lines: any[] = [];
  buildings: any[] = [];
  constructor(
    private scoreRecordservice: ScoreRecordService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getListPDCs();
    this.getListBuilding();
    this.getListLine();
  }
  getListPDCs() {
    this.scoreRecordservice.getListPDC().subscribe((res) => {
      this.pdcList = res.map((item) => {
        return { id: item, text: item };
      });
      this.pdcList.unshift({ id: "", text: "All" });
    });
  }
  getListBuilding() {
    this.scoreRecordservice.getListBuilding().subscribe((res) => {
      this.buildings = res.map((item) => {
        return { id: item, text: item };
      });
      this.buildings.unshift({ id: "", text: "All" });
    });
  }
  getListLine() {
    this.scoreRecordservice.getListLine().subscribe((res) => {
      this.lines = res.map((item) => {
        return { id: item, text: item };
      });
      this.lines.unshift({ id: "", text: "All" });
    });
  }
  pageChanged() {}
  addNew() {
    this.router.navigate(["/record/record-add/water-spider-scored-record-add"]);
  }
}

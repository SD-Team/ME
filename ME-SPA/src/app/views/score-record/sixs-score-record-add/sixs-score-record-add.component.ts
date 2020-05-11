import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from '@angular/router';
import { MesOrgService } from '../../../_core/_services/mes-org.service';
import { ScoreRecordService } from '../../../_core/_services/score-record.service';
@Component({
  selector: "app-sixs-score-record-add",
  templateUrl: "./sixs-score-record-add.component.html",
  styleUrls: ["./sixs-score-record-add.component.scss"],
})
export class SixsScoreRecordAddComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user'));
  today: Date = new Date();
  pdcs: string[];
  buildings:  string[];
  lineIDs: string[];
  auditType2List: string[];
  pdc: string; building: string; lineID: string;auditType2:string;
  constructor(private router:Router,
        private mesOrgService: MesOrgService,
        private scoreService:ScoreRecordService) { }

  ngOnInit() {
    this.getAllBuilding();
    this.getAllPdc();
    this.getAllLineId();
    this.getAllType2();
  }
  getAllPdc() {
    this.mesOrgService.getAllPdc().subscribe(res => {
      this.pdcs = res;
      this.pdc = this.pdcs[0];
    });
  }
  getAllBuilding() {
    this.mesOrgService.getAllBuilding().subscribe(res => {
      this.buildings = res;
      this.building = this.buildings[0];
    });
  }
  getAllLineId() {
    this.mesOrgService.getAllLineId().subscribe(res => {
      this.lineIDs = res;
      this.lineID = this.lineIDs[0];
    });
  }
  getAllType2() {
    this.scoreService.getAuditType2Score().subscribe(res => {
      this.auditType2List = res;
      this.auditType2 = this.auditType2List[0];
    });
  }
  back() {
    this.router.navigate(['maintenance/6s-score-record']);
  }
}

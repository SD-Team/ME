import { MesOrgService } from './../../../_core/_services/mes-org.service';
import { SmeScoreRecordService } from './../../../_core/_services/sme-score-record.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sme-score-record-add',
  templateUrl: './sme-score-record-add.component.html',
  styleUrls: ['./sme-score-record-add.component.scss']
})
export class SmeScoreRecordAddComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user'));
  today: Date = new Date();
  pdcs: string[];
  buildings:  string[];
  lineIDs: string[];
  auditType2List: string[];
  pdc: string; building: string; lineID: string; auditType2: string;
  constructor(private router: Router,
        private mesOrgService: MesOrgService,
        private smeScoreRecordService: SmeScoreRecordService) { }

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
    this.smeScoreRecordService.getAuditType2RecordAdd().subscribe(res => {
      console.log(res);
      this.auditType2List = res;
      this.auditType2 = this.auditType2List[0];
    });
  }
  back() {
    this.router.navigate(['maintenance/sme-score-record']);
  }
}


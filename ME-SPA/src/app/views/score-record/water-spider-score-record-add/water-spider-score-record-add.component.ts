import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MesOrgService } from '../../../_core/_services/mes-org.service';
import { ScoreRecordService } from '../../../_core/_services/score-record.service';
import {
  ScoreRecordQuestion,
  AuditRateM,
  AuditRateModel,
} from '../../../_core/_models/score-record-question';
import { AlertifyService } from '../../../_core/_services/alertify.service';
import { FunctionUtility } from '../../../_core/_utility/function-utility';
@Component({
  selector: 'app-water-spider-score-record-add',
  templateUrl: './water-spider-score-record-add.component.html',
  styleUrls: ['./water-spider-score-record-add.component.scss'],
})
export class WaterSpiderScoreRecordAddComponent implements OnInit {
  questions: ScoreRecordQuestion[] = [];
  user: any = JSON.parse(localStorage.getItem('user'));
  lang: string = 'en';
  today: Date = new Date();
  recordDate: Date = new Date();
  pdcs: string[];
  buildings: string[];
  lineIDs: string[];
  auditType2List: string[];
  pdc: string;
  building: string;
  lineID: string;
  auditType2: string;
  constructor(
    private router: Router,
    private mesOrgService: MesOrgService,
    private scoreService: ScoreRecordService,
    private alertifyService: AlertifyService,
    private functionUtility: FunctionUtility
  ) { }

  ngOnInit() {
    this.getAllBuilding();
    this.getAllPdc();
    this.getAllLineId();
    this.loadQuestion();
  }
  getAllPdc() {
    this.mesOrgService.getAllPdc().subscribe((res) => {
      this.pdcs = res;
      this.pdc = this.pdcs[0];
    });
  }
  getAllBuilding() {
    this.mesOrgService.getAllBuilding().subscribe((res) => {
      this.buildings = res;
      this.building = this.buildings[0];
    });
  }
  getAllLineId() {
    this.mesOrgService.getAllLineId().subscribe((res) => {
      this.lineIDs = res;
      this.lineID = this.lineIDs[0];
    });
  }
  back() {
    this.router.navigate(['maintenance/water-spider-score-record']);
  }
  saveAll(check) {

      let auditRateM = new AuditRateM();
      auditRateM.pdc = this.pdc;
      auditRateM.building = this.building;
      auditRateM.line = this.lineID;
      auditRateM.audit_Type1 = "精實系統/WS";
      auditRateM.audit_Type2 = "";
      auditRateM.audit_Type_ID = this.questions[0].audit_Type_ID;
      auditRateM.updated_By = this.user.user_Name;

      auditRateM.record_Date = this.functionUtility.ReturnDayNotTime(this.recordDate);

      let param = new AuditRateModel();
      param.listAuditRateD = this.questions;
      param.auditRateM = auditRateM;

      // kiểm tra phải trả lời hết các câu hỏi mới được lưu
      for (let index = 0; index < this.questions.length; index++) {
        if (this.questions[index].rate_Na === undefined) {
          this.alertifyService.error("Please answer all the questions");
          return;
        }
      }
      this.scoreService.saveScoreRecord(param).subscribe(
        () => {

          if(check==2){
            this.router.navigate(["/maintenance/water-spider-score-record"]);
          }
          else{
            this.pdc = this.pdcs[0];
            this.building = this.buildings[0];
            this.lineID = this.lineIDs[0];
            this.loadQuestion();
          }
          this.alertifyService.success("success");
        },
        (error) => {
          this.alertifyService.error(error);
        }
      );
  }
  loadQuestion() {
    const auditType1 = '精實系統/WS';
    const auditType2 = '';
    this.scoreService.getQuestion(auditType1, auditType2).subscribe((res) => {
      this.questions = res;
    });
  }

  checkChange(item: ScoreRecordQuestion, number) {
    if (number === 0) {
      item.rating_0 = 1;
      item.rating_1 = 0;
      item.rating_2 = 0;
      item.rate_Na = 0;
      item.remark = null;
    }
    if (number === 1) {
      item.rating_0 = 0;
      item.rating_1 = 1;
      item.rating_2 = 0;
      item.rate_Na = 0;
      item.remark = null;
    }
    if (number === 2) {
      item.rating_0 = 0;
      item.rating_1 = 0;
      item.rating_2 = 1;
      item.rate_Na = 0;
      item.remark = null;
    }
    if (number === 3) {
      item.rating_0 = 0;
      item.rating_1 = 0;
      item.rating_2 = 0;
      item.rate_Na = 1;
      item.remark = null;
    }
  }

  changeLanguage(event) {
    this.lang = event;
    this.loadQuestion();
  }
  cancel() {
    this.pdc = this.pdcs[0];
    this.building = this.buildings[0];
    this.lineID = this.lineIDs[0];
    this.loadQuestion();
  }
}

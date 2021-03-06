import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { MesOrgService } from "../../../_core/_services/mes-org.service";
import { ScoreRecordService } from "../../../_core/_services/score-record.service";
import {
  ScoreRecordQuestion,
  AuditRateM,
  AuditRateModel,
} from "../../../_core/_models/score-record-question";
import { AlertifyService } from "../../../_core/_services/alertify.service";
import { FunctionUtility } from '../../../_core/_utility/function-utility';
@Component({
  selector: "app-sixs-score-record-add",
  templateUrl: "./sixs-score-record-add.component.html",
  styleUrls: ["./sixs-score-record-add.component.scss"],
})
export class SixsScoreRecordAddComponent implements OnInit {
  questions: ScoreRecordQuestion[] = [];
  user: any = JSON.parse(localStorage.getItem("user"));
  lang: string = 'en';
  today: Date = new Date();
  recordDate: Date = new Date();
  pdcs: string[];
  buildings: string[];
  lineIDs: string[];
  auditType2List: any[] = [];
  pdc: string;
  building: string;
  lineID: string;
  auditType2: string = "";
  MEPIC: string = '';
  MEPICS: any[] = [];
  PDRESP: string = '';
  PDRESPS: any[] = [];
  constructor(
    private router: Router,
    private mesOrgService: MesOrgService,
    private scoreService: ScoreRecordService,
    private alertifyService: AlertifyService,
    private functionUtility: FunctionUtility
  ) {}

  ngOnInit() {
    this.getAllBuilding();
    this.getAllPdc();
    this.getAllLineId();
    this.getAllType2();
    this.getMEPIC();
    this.getPDRESP();
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
  getAllType2() {
    this.scoreService.getAuditType2Score().subscribe((res) => {
      this.auditType2List = res.map((item) => {
        return { id: item, text: item };
      });
      this.auditType2List.unshift({ id: "", text: "Select auditType2" });
    });
  }
  getMEPIC() {
    this.scoreService.getListMEPIC().subscribe((res) => {
      this.MEPICS = res;
      this.MEPIC = this.MEPICS[0].resp_ID;
    });
  }
  getPDRESP() {
    this.scoreService.getListPDRESP().subscribe((res) => {
      this.PDRESPS = res;
      this.PDRESP = this.PDRESPS[0].resp_ID;
    });
  }
  back() {
    this.router.navigate(["maintenance/6s-score-record"]);
  }
  loadQuestion() {
    const auditType1 = "6S";
    const auditType2 = this.auditType2;
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
  saveAll(check) {
    if (this.auditType2 == "") {
      this.alertifyService.error("Please option auditType2");
    } else {
      let auditRateM = new AuditRateM();
      auditRateM.pdc = this.pdc;
      auditRateM.building = this.building;
      auditRateM.line = this.lineID;
      auditRateM.audit_Type1 = "6S";
      auditRateM.audit_Type2 = this.auditType2;
      auditRateM.audit_Type_ID = this.questions[0].audit_Type_ID;
      auditRateM.updated_By = this.user.user_Name;
      auditRateM.mE_PIC = this.MEPIC;
      auditRateM.pD_RESP = this.PDRESP;
      auditRateM.record_Date = this.functionUtility.returnDayNotTime(this.recordDate);
      
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
        
          if(check!=2){
            this.questions = [];
            this.auditType2 = "";
          }
          else{
            this.router.navigate(["maintenance/6s-score-record"]);
          }
          this.alertifyService.success("success");
        },
        (error) => {
          this.alertifyService.error(error);
        }
      );
    }
  }
  auditType2Change() {
    this.loadQuestion();
  }
  cancel() {
    this.loadQuestion();
  }
  changeLanguage(event) {
    this.lang = event;
    this.loadQuestion();
  }
}

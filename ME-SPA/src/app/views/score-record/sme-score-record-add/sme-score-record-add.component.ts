import { AlertifyService } from "./../../../_core/_services/alertify.service";
import {SmeRecordQuestion, AuditRateM, AuditRateModel } from "./../../../_core/_models/sme-record-question";
import { MesOrgService } from "./../../../_core/_services/mes-org.service";
import { SmeScoreRecordService } from "./../../../_core/_services/sme-score-record.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FunctionUtility } from './../../../_core/_utility/function-utility';
import { ScoreRecordService } from './../../../_core/_services/score-record.service';

@Component({
  selector: "app-sme-score-record-add",
  templateUrl: "./sme-score-record-add.component.html",
  styleUrls: ["./sme-score-record-add.component.scss"],
})
export class SmeScoreRecordAddComponent implements OnInit {
  questions: SmeRecordQuestion[] = [];
  user: any = JSON.parse(localStorage.getItem("user"));
  lang: string = 'en';
  today: Date = new Date();
  recordDate: Date = new Date();
  pdcs: string[];
  buildings: string[];
  lineIDs: string[];
  auditType2s: any[] = [];
  auditType2: string = "";
  btAuditType2: boolean;
  isShow: true;
  pdc: string;
  building: string;
  lineID: string;
  MEPIC: string = '';
  MEPICS: any[] = [];
  PDRESP: string = '';
  PDRESPS: any[] = [];
  constructor(
    private router: Router,
    private mesOrgService: MesOrgService,
    private smeScoreRecordService: SmeScoreRecordService,
    private alertifyService: AlertifyService,
    private functionUtility: FunctionUtility,
    private scoreService: ScoreRecordService
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
    this.smeScoreRecordService.getAuditType2Score().subscribe((res) => {
      this.auditType2s = res.map((item) => {
        console.log(res);
        return { id: item, text: item };
      });
      this.auditType2s.unshift({ id: "", text: "Select AuditType2" });
      this.loadQuestion();
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

  loadQuestion() {
    const auditType1 = "SME2.0";
    const auditType2 = this.auditType2;
    this.smeScoreRecordService
      .getQuestion(auditType1, auditType2)
      .subscribe((res) => {
        this.questions = res;
      });
  }

  back() {
    this.router.navigate(["maintenance/sme-score-record"]);
  }

  checkChange(item: SmeRecordQuestion, number) {
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
      auditRateM.audit_Type1 = "SME2.0";
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
      this.smeScoreRecordService.saveScoreRecord(param).subscribe(
        () => {

          if (check==2){
            this.router.navigate(["maintenance/sme-score-record"]);
          }
          else{
            this.questions = [];
            this.auditType2 = "";
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

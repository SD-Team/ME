import { Pagination } from './../../../../_core/_models/pagination';
import { SmeScoreRecordService } from './../../../../_core/_services/sme-score-record.service';
import { AuditRateDDetail } from './../../../../_core/_models/score-record-detail';
import { AuditRateM } from './../../../../_core/_models/sme-record-question';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sme-score-record-detail',
  templateUrl: './sme-score-record-detail.component.html',
  styleUrls: ['./sme-score-record-detail.component.scss']
})
export class SmeScoreRecordDetailComponent implements OnInit {
  url: any = '../../../../../assets/img/avatars/8.jpg';
  recordId: string = '';
  auditRateM: AuditRateM = {
    record_ID: '',
    audit_Type_ID: '',
    pdc: '',
    building: '',
    line: '',
    audit_Type1: '',
    audit_Type2: '',
    me_Pic: '',
    pd_Resp: '',
    updated_By: '',
    updated_Time: '',
    record_Date: null,
  };
  listAuditRateD: AuditRateDDetail[];
  constructor(private router: Router,
              private activeRouter: ActivatedRoute,
              private smeScoreRecordService: SmeScoreRecordService) { }

  ngOnInit() {
    this.loadDetail(this.recordId);
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      };
    }
  }

  loadDetail(recordId: string) {
    this.activeRouter.params.subscribe((params) => {
      // tslint:disable-next-line:prefer-const
      let recordId = params['recordId'];
      this.smeScoreRecordService.getDetailScoreRecord(recordId)
      .subscribe(data => {
        console.log(data);
        this.auditRateM = data.auditRateM;
        this.listAuditRateD = data.listAuditRateD;
        });
    });
  }



  back() {
    this.router.navigate(['/maintenance/sme-score-record']);
  }

}

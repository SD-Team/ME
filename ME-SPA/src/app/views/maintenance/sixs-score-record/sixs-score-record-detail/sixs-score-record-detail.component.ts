import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { ScoreRecordService } from '../../../../_core/_services/score-record.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditRateM } from '../../../../_core/_models/score-record-question';
import { AuditRateDDetail } from '../../../../_core/_models/score-record-detail';
import { AlertifyService } from '../../../../_core/_services/alertify.service';

@Component({
  selector: 'app-sixs-score-record-detail',
  templateUrl: './sixs-score-record-detail.component.html',
  styleUrls: ['./sixs-score-record-detail.component.scss']
})
export class SixsScoreRecordDetailComponent implements OnInit {
  urlImage = environment.imageUrl;
  url: any = '../../../../../assets/img/avatars/8.jpg';
  recordId:string ='';
  auditRateM:AuditRateM={
    record_ID:'',
    audit_Type_ID:'',
    pdc:'',
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
  listAuditRateD:AuditRateDDetail[]=[];
  constructor(private router: Router,
    private scoreRecordService: ScoreRecordService,
    private spinner: NgxSpinnerService,
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.scoreRecordService.currentRecordId.subscribe(recordId=>this.recordId=recordId)
    this.loadData();
  }
  loadData()
  {
    this.spinner.show();
    this.scoreRecordService.getDetailScoreRecord(this.recordId).subscribe(res=>{
      this.auditRateM =res.auditRateM;
      debugger;
      this.listAuditRateD=res.listAuditRateD;
    },(error)=>{
      this.alertify.error(error);
    })
    this.spinner.hide();
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
back()
{
  this.router.navigate(['maintenance/6s-score-record'])
}
chkRating(item){
  //check hide Remake
  if(item.rating0 == 1)
  {
    return true;
  }
  else{
    return false;
  }
}
}

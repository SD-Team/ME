import { AuditRateDDetail } from './../../../../_core/_models/score-record-detail';
import { AuditRateM } from './../../../../_core/_models/sme-record-question';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sme-score-record-detail',
  templateUrl: './sme-score-record-detail.component.html',
  styleUrls: ['./sme-score-record-detail.component.scss']
})
export class SmeScoreRecordDetailComponent implements OnInit {
  url: any = '../../../../../assets/img/avatars/8.jpg';
  recordId: string = '';
  auditRateM: AuditRateM;
  listAuditRateD: AuditRateDDetail[];
  constructor(private router: Router) { }

  ngOnInit() {
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

  back() {
    this.router.navigate(['/maintenance/sme-score-record']);
  }

}

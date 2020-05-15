import { AuditRateM } from './../../../../_core/_models/score-record-question';
import { AuditRateDDetail } from './../../../../_core/_models/score-record-detail';
import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { ScoreRecordService } from '../../../../_core/_services/score-record.service';
import { environment } from '../../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { WaterSpiderScoreRecordService } from '../../../../_core/_services/water-spider-score-record.service';

@Component({
  selector: 'app-water-spider-score-record-detail',
  templateUrl: './water-spider-score-record-detail.component.html',
  styleUrls: ['./water-spider-score-record-detail.component.scss']
})
export class WaterSpiderScoreRecordDetailComponent implements OnInit {
  urlNoImage: string = environment.imageUrl + 'no-image.jpg';
  url: any = environment.imageUrl;
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
  listAuditRateD: AuditRateDDetail[] = [];

  constructor(private alertifyService: AlertifyService,
    private scoreRecordService: ScoreRecordService, private route: ActivatedRoute,
    private router: Router, private waterSpiderService: WaterSpiderScoreRecordService) { }

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.recordId = param['recordId'];
    });
    this.loadData();
  }
  onSelectFile(event, auditItemId) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const title = event.target.files[0].name.split('.').pop();
      const fileZise = event.target.files[0].size;
      const file = event.target.files[0];
      // kiểm tra đuôi file
      if (title === 'jpg' || title === 'jpeg' || title === 'png' || title === 'JPG' || title === 'JPEG' || title === 'PNG') {
        // nếu là hình phải nhỏ hơn 2MB
        if (fileZise <= 2097152) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('recordId', this.recordId);
          formData.append('auditItemId', auditItemId);
          this.scoreRecordService.uploadPicture(formData).subscribe(() => {
            this.loadData();
            this.alertifyService.success(
              'Upload image of ' + auditItemId + ' successfully'
            );
          },
            (error) => {
              this.alertifyService.error(
                'Upload image of ' + auditItemId + ' failed'
              );
            });
        }
        else {
          this.alertifyService.error('Images cannot be larger than 2MB');
        }
      }
      else if (title === 'mp4' || title === 'MP4') {
        if (fileZise <= 5242880) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('recordId', this.recordId);
          formData.append('auditItemId', auditItemId);
          this.scoreRecordService.uploadPicture(formData).subscribe(() => {
            this.loadData();
            this.alertifyService.success(
              'Upload video of ' + auditItemId + ' successfully'
            );
          },
            (error) => {
              this.alertifyService.error(
                'Upload video of ' + auditItemId + ' failed'
              );
            });
        }
        else {
          this.alertifyService.error('Video cannot be larger than 5MB');
        }
      }
      else {
        this.alertifyService.error('Incorrect format');
      }
    }
  }

  chkImage(uploadPicture) {
    if (uploadPicture != null) {
      if (
        uploadPicture.split('.').pop() === 'mp4' ||
        uploadPicture.split('.').pop() === 'MP4'
      ) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  loadData() {
    this.scoreRecordService.getDetailScoreRecord(this.recordId).subscribe(res => {
      this.auditRateM = res.auditRateM;
      this.listAuditRateD = res.listAuditRateD;
    });
  }

  back() {
    this.router.navigate(['/maintenance/water-spider-score-record'])
  }

  exportExcel() {
    this.waterSpiderService.exportExcelDetail(this.recordId);
  }
}

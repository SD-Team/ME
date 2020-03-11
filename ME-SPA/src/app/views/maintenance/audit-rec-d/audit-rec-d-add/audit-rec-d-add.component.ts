import { Component, OnInit } from '@angular/core';
import { AuditTypeService } from '../../../../_core/_services/audit-type.service';
import { AuditTypeDService } from '../../../../_core/_services/audit-type-d.service';
import { AuditPicDService } from '../../../../_core/_services/audit-pic-d.service';
import { AuditRecDService } from '../../../../_core/_services/audit-rec-d.service';
import { AuditRecMService } from '../../../../_core/_services/audit-rec-m.service';
import { Router } from '@angular/router';
import { AlertifyService } from '../../../../_core/_services/alertify.service';

@Component({
  selector: 'app-audit-rec-d-add',
  templateUrl: './audit-rec-d-add.component.html',
  styleUrls: ['./audit-rec-d-add.component.css']
})
export class AuditRecDAddComponent implements OnInit {
  auditRecD: any = {};
  flag: string;
  auditType: any = [];
  auditItems: any = [];
  pdPics: any = [];
  mePics: any = [];
  audit_Item: string;
  constructor(private auditTypeMService: AuditTypeService,
              private auditTypeDService: AuditTypeDService,
              private auditPicDService: AuditPicDService,
              private auditRecDService: AuditRecDService,
              private auditRecMService: AuditRecMService,
              private router: Router,
              private alertifyService: AlertifyService) { }

  ngOnInit(): void {
    this.auditRecDService.auditRecDSource.subscribe(auditRecD => this.auditRecD = auditRecD);
    this.auditRecDService.flagSource.subscribe(flag => this.flag = flag);
    if (this.flag === '1') {
      this.auditItems.push(this.auditRecD.audit_Item);
    }
    if (this.auditRecD.mE_PIC !== undefined) {
      this.auditRecD.mE_PIC =  this.auditRecD.mE_PIC.trim();
    }
    if (this.auditRecD.audit_Item !== undefined) {
      this.auditRecD.audit_Item =  this.auditRecD.audit_Item.trim();
    }
    this.getListAuditTypeVersion();
    this.getAllPdPic();
    this.getAllMePic();
  }
  saveAndNext() {
    if (this.flag === '0') {
      this.auditRecD.record_ID = this.auditRecMService.setStringRecordID(this.auditRecD.finished_Date);
      this.auditRecDService.add(this.auditRecD).subscribe(res => {
        this.alertifyService.success('Add succed!');
      }, error => {
        this.alertifyService.error(error);
      });
    } else {
      this.auditRecDService.update(this.auditRecD).subscribe(res => {
        this.alertifyService.success('Update succed!');
      }, error => {
        this.alertifyService.error(error);
      });
    }
  }
  save() {
    if (this.flag === '0') {
      this.auditRecD.record_ID = this.auditRecMService.setStringRecordID(this.auditRecD.finished_Date);
      this.auditRecDService.add(this.auditRecD).subscribe(res => {
        this.alertifyService.success('Add succed!');
        this.router.navigate(['/maintenance/audit-rec/audit-recD-list']);
      }, error => {
        this.alertifyService.error(error);
      });
    } else {
      this.auditRecDService.update(this.auditRecD).subscribe(res => {
        this.alertifyService.success('Add succed!');
        this.router.navigate(['/maintenance/audit-rec/audit-recD-list']);
      }, error => {
        this.alertifyService.error(error);
      });
    }
  }
  // Hàm lấy tên file khi upload file
  beforePictureEvent(fileInput: Event) {
    const file = (<HTMLInputElement>fileInput.target).files[0];
    this.auditRecD.before_Picture = file.name ;
  }
  afterPictureEvent(fileInput: Event) {
    const file = (<HTMLInputElement>fileInput.target).files[0];
    this.auditRecD.after_Picture = file.name ;
  }
  getListAuditTypeVersion() {
    this.auditTypeMService.getAuditTypeVersion().subscribe(res => {
      this.auditType = res;
    });
  }
  optionAuditType() {
    this.auditTypeDService.searchauditItem(this.auditRecD.audit_Type_ID).subscribe(res => {
      this.auditItems = res;
      this.auditRecD.audit_Item = this.auditItems[0];
    });
  }
  getAllPdPic() {
    this.auditPicDService.getAllPdPic().subscribe(res => {
      this.pdPics = res;
    });
  }
  getAllMePic() {
    this.auditPicDService.getAllMePic().subscribe(res => {
      this.mePics = res;
    });
  }
  back() {
    this.router.navigate(['/maintenance/audit-rec']);
  }
}

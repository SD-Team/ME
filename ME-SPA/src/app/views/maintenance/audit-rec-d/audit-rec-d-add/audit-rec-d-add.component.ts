import { Component, OnInit } from '@angular/core';
import { AuditTypeService } from '../../../../_core/_services/audit-type.service';
import { AuditTypeDService } from '../../../../_core/_services/audit-type-d.service';
import { AuditPicDService } from '../../../../_core/_services/audit-pic-d.service';
import { AuditRecDService } from '../../../../_core/_services/audit-rec-d.service';
import { AuditRecMService } from '../../../../_core/_services/audit-rec-m.service';

@Component({
  selector: 'app-audit-rec-d-add',
  templateUrl: './audit-rec-d-add.component.html',
  styleUrls: ['./audit-rec-d-add.component.css']
})
export class AuditRecDAddComponent implements OnInit {
  auditRecD: any = {};
  auditType: any = [];
  auditItems: any = [];
  pdPics: any = [];
  mePics: any = [];
  audit_Item: string;
  constructor(private auditTypeMService: AuditTypeService,
              private auditTypeDService: AuditTypeDService,
              private auditPicDService: AuditPicDService,
              private auditRecDService: AuditRecDService,
              private auditRecMService: AuditRecMService) { }

  ngOnInit(): void {
    this.getListAuditTypeVersion();
    this.getAllPdPic();
    this.getAllMePic();
  }
  saveAndNext() {
    this.auditRecD.record_ID = this.auditRecMService.setStringRecordID(this.auditRecD.finished_Date);
    this.auditRecDService.add(this.auditRecD).subscribe(res => {
    });
  }

  // Hàm lấy tên file khi upload file
  fileEvent(fileInput: Event) {
    const file = (<HTMLInputElement>fileInput.target).files[0];
    this.auditRecD.before_Picture = file.name ;

}
  getListAuditTypeVersion() {
    this.auditTypeMService.getAuditTypeVersion().subscribe(res => {
      this.auditType = res;
    });
  }
  optionAuditType() {
    this.auditTypeDService.searchauditItem(this.auditRecD.audit_Type_ID).subscribe(res => {
      this.auditItems = res;
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
}

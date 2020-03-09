import { Component, OnInit } from '@angular/core';
import { MesOrgService } from '../../../../_core/_services/mes-org.service';
import { MesMoService } from '../../../../_core/_services/mes-mo.service';
import { AuditRecMService } from '../../../../_core/_services/audit-rec-m.service';
import { AlertifyService } from '../../../../_core/_services/alertify.service';

@Component({
  selector: 'app-audit-rec-m-add',
  templateUrl: './audit-rec-m-add.component.html',
  styleUrls: ['./audit-rec-m-add.component.scss']
})
export class AuditRecMAddComponent implements OnInit {
  auditRecM: any = {};
  pdcs: string[];
  buildings:  string[];
  lineIDs: string[];
  modelNos: string[];
  pdc: string; building: string; lineID: string; modelNo: string; modelName: string;
  constructor(private mesOrgService: MesOrgService,
              private mesMoService: MesMoService,
              private auditRecMService: AuditRecMService,
              private alertifyService: AlertifyService) { }
  ngOnInit() {
    this.getAllPdc();
    this.getAllBuilding();
    this.getAllLineId();
    this.getAllModelNo();
  }
  saveAndNext() {
    this.auditRecM.model_No = this.modelNo;
    this.auditRecM.model_Name = this.modelName;
    // const arrTime = new Date(this.record_Time);
    // this.auditRecM.record_Time = (arrTime.getFullYear() + '/' + (arrTime.getMonth() + 1) + '/' + arrTime.getDate());
    this.auditRecM.record_ID = 'REC' + this.auditRecMService.setStringRecordID(this.auditRecM.record_Time);
    this.auditRecMService.create(this.auditRecM).subscribe(res => {
      this.alertifyService.success('Add succed!');
    }, error => {
      this.alertifyService.error(error);
    });
    console.log(this.auditRecM);
  }
  cancel() {
    this.auditRecM = {};
    this.modelNo = '';
    this.modelName = '';
  }
  getAllPdc() {
    this.mesOrgService.getAllPdc().subscribe(res => {
      this.pdcs = res;
    });
  }
  getAllBuilding() {
    this.mesOrgService.getAllBuilding().subscribe(res => {
      this.buildings = res;
    });
  }
  getAllLineId() {
    this.mesOrgService.getAllLineId().subscribe(res => {
      this.lineIDs = res;
    });
  }
  getAllModelNo() {
    this.mesMoService.getModelNo().subscribe(res => {
      this.modelNos = res;
    });
  }
  changeOptionModelNo() {
    this.mesMoService.getModelName(this.modelNo).subscribe(res => {
      this.modelName = res.dataResult;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MesOrgService } from '../../../../_core/_services/mes-org.service';
import { MesMoService } from '../../../../_core/_services/mes-mo.service';
import { AuditRecMService } from '../../../../_core/_services/audit-rec-m.service';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { Router } from '@angular/router';

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
              private alertifyService: AlertifyService,
              private router: Router) { }
  ngOnInit() {
    this.getAllPdc();
    this.getAllBuilding();
    this.getAllLineId();
    this.getAllModelNo();
  }
  saveAndNext() {
    this.auditRecM.model_No = this.modelNo;
    this.auditRecM.model_Name = this.modelName;
    this.auditRecMService.create(this.auditRecM).subscribe(res => {
      this.alertifyService.success('Add succed!');
    }, error => {
      this.alertifyService.error(error);
    });
  }
  save() {
    this.auditRecM.model_No = this.modelNo;
    this.auditRecM.model_Name = this.modelName;
    this.auditRecMService.create(this.auditRecM).subscribe(res => {
      this.alertifyService.success('Add succed!');
      this.router.navigate(['/maintenance/audit-rec/audit-recM-list']);
    }, error => {
      this.alertifyService.error(error);
    });
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
  back() {
    this.router.navigate(['/maintenance/audit-rec']);
  }
}

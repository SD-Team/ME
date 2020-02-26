import { Component, OnInit } from '@angular/core';
import { AuditTypeDService } from '../../../../_core/_services/audit-type-d.service';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { Router } from '@angular/router';
import { AuditTypeService } from '../../../../_core/_services/audit-type.service';
import { AuditType } from '../../../../_core/_models/audit-type';

@Component({
  selector: 'app-audit-type-d-add',
  templateUrl: './audit-type-d-add.component.html',
  styleUrls: ['./audit-type-d-add.component.css']
})
export class AuditTypeDAddComponent implements OnInit {

  constructor(private auditTypeDService: AuditTypeDService,
              private alertify: AlertifyService,
              private auditTypeMService: AuditTypeService,
              private router: Router) { }
  auditType: any = {};
  auditTypeM: AuditType[];
  flag = '0';
  ngOnInit(): void {
    this.auditTypeDService.currentAuditType.subscribe(auditType => this.auditType = auditType);
    this.auditTypeDService.currentFlag.subscribe(flag => this.flag = flag);
    this.getAllAuditTypeM();
  }
  backList() {
    this.router.navigate(['/maintenance/audit-type-d']);
  }
  saveAndNext() {
    if (this.flag === '0') {
      this.auditTypeDService.create(this.auditType).subscribe(
        () => {
          this.alertify.success('Add succeed');
          this.auditType = {};
          //  this.router.navigate(['/maintenance/brand'])
        },
        error => {
          this.alertify.error(error);
        }
      );
    } else {
      this.auditTypeDService.update(this.auditType).subscribe(
        () => {
          this.alertify.success('Updated succeed');
          this.router.navigate(['/maintenance/audit-type-d']);
        },
        error => {
          this.alertify.error(error);
        }
      );
    }
  }
  save() {
    if (this.flag === '0') {
      this.auditTypeDService.create(this.auditType).subscribe(
        () => {
          this.alertify.success('Add succeed');
          this.auditType = {};
          this.router.navigate(['/maintenance/audit-type-d']);
        },
        error => {
          this.alertify.error(error);
        }
      );
    } else {
      this.auditTypeDService.update(this.auditType).subscribe(
        () => {
          this.alertify.success('Updated succeed');
          this.router.navigate(['/maintenance/audit-type-d']);
        },
        error => {
          this.alertify.error(error);
        }
      );
    }
  }
  getAllAuditTypeM() {
    this.auditTypeMService.getAlls().subscribe(
      data => {
        this.auditTypeM = data;
      },
      error => {
        this.alertify.error(error);
      }
    );
  }
  cancel() {
    this.auditType = {};
  }
}

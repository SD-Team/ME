import { Component, OnInit } from '@angular/core';
import { AuditPicDService } from '../../../../_core/_services/audit-pic-d.service';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { AuthService } from '../../../../_core/_services/auth.service';
import { Router } from '@angular/router';
import { AuditPicMService } from '../../../../_core/_services/audit-pic-m.service';
import { AuditPicM } from '../../../../_core/_models/audit-pic-m';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-audit-pic-d-add',
  templateUrl: './audit-pic-d-add.component.html',
  styleUrls: ['./audit-pic-d-add.component.scss']
})
export class AuditPicDAddComponent implements OnInit {
  auditPicD: any = {};
  auditPicM: AuditPicM[] = [];
  flag = '0';
  constructor(private auditPicDService: AuditPicDService,
              private auditPicMService: AuditPicMService,
              private alertify: AlertifyService,
              private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.auditPicDService.currentFlag.subscribe(flag => this.flag = flag);
    this.auditPicDService.currentAuditPicD.subscribe(auditPicD => this.auditPicD = auditPicD);
    this.getAllPicM();
  }
  getAllPicM() {
    this.auditPicMService.getAlls().subscribe(res => {
      this.auditPicM = res;
    });
  }
  cancel() {
    this.auditPicD = {};
  }
  backList() {
    this.router.navigate(['/maintenance/audit-pic-d']);
  }
  saveAndNext() {
    if (this.flag === '0') {
      this.auditPicDService.create(this.auditPicD).subscribe( () => {
        this.alertify.success('Add succeed');
        this.auditPicD = {};
      }, error => {
        this.alertify.error(error);
      });
    }
  }
  save() {
    // tslint:disable-next-line:prefer-const
    let okSave = false;
    const countCharactersPdc = this.auditPicD['pdc'].split('').length;
    const countCharactersBuilding = this.auditPicD['building'].split('').length;
    const countCharactersLanguage = this.auditPicD['language'].split('').length;
    const parrentPdc = '.parent-pdc';
    const parrentBuilding = '.parent-building';
    const parrentLanguage = '.parent-language';
    const spanPdc = 'pdc-id';
    const spanBuilding = 'building-id';
    const spanLanguage = 'language-id';
    const newHtmlPdc = '<span id="pdc-id" style="color:red;">Maximum 1 characters</span>';
    const newHtmlBuilding = '<span id="building-id" style="color:red;">Maximum 1 characters</span>';
    const newHtmlLanguage = '<span id="language-id" style="color:red;">Maximum 1 characters</span>';
    if (countCharactersPdc > 1) {
      this.changeHtmlError(parrentPdc, spanPdc, newHtmlPdc);
    } else {
      if (document.getElementById(spanPdc) !== null) {
        this.deleteListItem(spanPdc);
      }
    }

    if (countCharactersBuilding > 1) {
      this.changeHtmlError(parrentBuilding, spanBuilding, newHtmlBuilding);
    } else {
      if (document.getElementById(spanBuilding) !== null) {
        this.deleteListItem(spanBuilding);
      }
    }

    if (countCharactersLanguage > 2) {
      this.changeHtmlError(parrentLanguage, spanLanguage, newHtmlLanguage);
    } else {
      if (document.getElementById(spanLanguage) !== null) {
        this.deleteListItem(spanLanguage);
      }
    }
    if (countCharactersPdc === 1 &&
        countCharactersBuilding === 1 &&
        countCharactersLanguage <= 2 && countCharactersLanguage >= 1) {
      if (this.flag === '0') {
            this.auditPicDService.create(this.auditPicD).subscribe( () => {
              this.alertify.success('Add succeed');
              this.router.navigate(['/maintenance/audit-pic-d']);
            }, error => {
              this.alertify.error(error);
            });
          } else {
            this.auditPicDService.update(this.auditPicD).subscribe(
              () => {
                this.alertify.success('Updated succeed');
                this.router.navigate(['/maintenance/audit-pic-d']);
              },
              error => {
                this.alertify.error(error);
              }
            );
          }
    }
  }
  deleteListItem (selectorID) {
    // tslint:disable-next-line:prefer-const
    let el = document.getElementById(selectorID);
    el.parentNode.removeChild(el);
  }
  changeHtmlError(parentDiv, span, newHtml) {
    if (document.getElementById(span) === null) {
      document.querySelector(parentDiv).insertAdjacentHTML('beforeend', newHtml);
    } else {
      this.deleteListItem(span);
      document.querySelector(parentDiv).insertAdjacentHTML('beforeend', newHtml);
    }
  }
}

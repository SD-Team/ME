import { Component, OnInit } from '@angular/core';
import { AuditTypeD } from '../../../../_core/_models/audit-type-d';
import { User } from '../../../../_core/_models/user';
import { Pagination, PaginatedResult } from '../../../../_core/_models/pagination';
import { AuditTypeDService } from '../../../../_core/_services/audit-type-d.service';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-audit-type-d-list',
  templateUrl: './audit-type-d-list.component.html',
  styleUrls: ['./audit-type-d-list.component.scss']
})
export class AuditTypeDListComponent implements OnInit {
  auditTypes: AuditTypeD[];
  auditType: any = {};
  user: User = JSON.parse(localStorage.getItem('user'));
  pagination: Pagination;
  text: string;
  constructor(  private auditTypeDService: AuditTypeDService,
                private alertify: AlertifyService,
                private router: Router,
                private route: ActivatedRoute,
                private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.auditTypeDService.currentAuditType.subscribe(auditType => this.auditType = auditType);
    this.route.data.subscribe(data => {
      console.log('Data: ', data);
      this.spinner.hide();
      this.auditTypes = data['auditTypes'].result;
      this.pagination = data['auditTypes'].pagination;
    });
    console.log('pa:', this.pagination);
  }

  load() {
    // this.spinner.show();
    this.auditTypeDService.getListAll(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<AuditTypeD[]>) => {
        this.auditTypes = res.result;
        this.pagination = res.pagination;
        //    this.spinner.hide();
      }, error => {
        this.alertify.error(error);
      });
  }
  search() {
    if (this.text !== '') {
      this.auditTypeDService.search(this.pagination.currentPage, this.pagination.itemsPerPage, this.text)
        .subscribe((res: PaginatedResult<AuditTypeD[]>) => {
          this.auditTypes = res.result;
          this.pagination = res.pagination;
          console.log('Search: ', this.auditTypes);
        }, error => {
          this.alertify.error(error);
        });
    } else {
      this.load();
    }
  }
  add() {
    this.auditType = {};
    this.auditTypeDService.changeAuditType(this.auditType);
    this.auditTypeDService.changeFlag('0');
    this.router.navigate(['/maintenance/audit-type-d/add']);
  }

  changeToEdit(auditType: AuditTypeD) {
    this.auditTypeDService.changeAuditType(auditType);
    this.auditTypeDService.changeFlag('1');
    this.router.navigate(['/maintenance/audit-type-d/add']);
  }

  delete(auditType: AuditTypeD) {
    this.alertify.confirm('Delete Audit Type', 'Are you sure you want to delete this AuditType "' + auditType.id + '" ?', () => {
      this.auditTypeDService.delete(auditType.id).subscribe(() => {
        this.load();
        this.alertify.success('Audit Type has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the Audit Type');
      });
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.load();
  }
}

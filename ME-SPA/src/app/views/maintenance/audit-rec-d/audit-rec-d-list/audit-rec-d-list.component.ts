import { Component, OnInit } from '@angular/core';
import { AuditRecDService } from '../../../../_core/_services/audit-rec-d.service';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditRecViewModel } from '../../../../_core/_models/audit-rec-viewmodel';
import { User } from '../../../../_core/_models/user';
import { Pagination, PaginatedResult } from '../../../../_core/_models/pagination';

@Component({
  selector: 'app-audit-rec-d-list',
  templateUrl: './audit-rec-d-list.component.html',
  styleUrls: ['./audit-rec-d-list.component.css']
})
export class AuditRecDListComponent implements OnInit {
  auditRecs: AuditRecViewModel[];
  user: User = JSON.parse(localStorage.getItem('user'));
  pagination: Pagination;
  text: string;
  searchKey = false;
  constructor(private auditRecDService: AuditRecDService,
              private alertify: AlertifyService,
              private router: Router,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.data.subscribe(data => {
      console.log(data['auditRecs'].result);
      this.auditRecs = data['auditRecs'].result;
      this.auditRecs = data['auditRecs'].result;
      this.pagination = data['auditRecs'].pagination;
      this.spinner.hide();
    });
  }
  load() {
    if (this.searchKey === false) {
      this.auditRecDService.getListAll(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<AuditRecViewModel[]>) => {
        this.auditRecs = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
    } else {
      // this.auditRecDService.search(this.pagination.currentPage, this.pagination.itemsPerPage, this.text)
      //   .subscribe((res: PaginatedResult<AuditRecViewModel[]>) => {
      //     this.auditRecs = res.result;
      //     this.pagination = res.pagination;
      //   }, error => {
      //     this.alertify.error(error);
      //   });
    }
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.load();
  }
}

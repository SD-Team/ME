import { Component, OnInit } from '@angular/core';
import { AuditRecDService } from '../../../../_core/_services/audit-rec-d.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Pagination } from '../../../../_core/_models/pagination';
import { AuditRecD } from '../../../../_core/_models/audit-rec-d';

@Component({
  selector: 'app-audit-rec-d-list',
  templateUrl: './audit-rec-d-list.component.html',
  styleUrls: ['./audit-rec-d-list.component.scss']
})
export class AuditRecDListComponent implements OnInit {
  auditRecDs: AuditRecD[];
  pagination: Pagination;
  constructor(private auditRecDService: AuditRecDService,
              private router: Router,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.route.data.subscribe(data => {
      console.log(data);
      this.auditRecDs = data['auditRecDs'].result;
      this.pagination = data['auditRecDs'].pagination;
      this.spinner.hide();
    });
  }
  load() {
    this.auditRecDService.getListRecDs(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(res => {
      this.auditRecDs = res.result;
      this.pagination = res.pagination;
    });
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.load();
  }
  update(auditRecD: AuditRecD) {
    this.auditRecDService.changeFlag('1');
    this.auditRecDService.changeAuditRecD(auditRecD);
    this.router.navigate(['/maintenance/audit-rec/add-audit-recD']);
  }
}

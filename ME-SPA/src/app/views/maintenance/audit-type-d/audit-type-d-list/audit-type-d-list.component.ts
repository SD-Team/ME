import { Component, OnInit } from '@angular/core';
import { AuditTypeD } from '../../../../_core/_models/audit-type-d';
import { User } from '../../../../_core/_models/user';
import { Pagination, PaginatedResult } from '../../../../_core/_models/pagination';
import { AuditTypeDService } from '../../../../_core/_services/audit-type-d.service';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditTypeService } from '../../../../_core/_services/audit-type.service';
import { AuditType } from '../../../../_core/_models/audit-type';

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
  auditType1List: string[];
  auditType2List: AuditType[];
  auditType1: string;
  auditType2: string;
  checkSearch = '0';
  constructor(  private auditTypeDService: AuditTypeDService,
                private auditTypeMService: AuditTypeService,
                private alertify: AlertifyService,
                private router: Router,
                private route: ActivatedRoute,
                private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.auditTypeDService.currentAuditType.subscribe(auditType => this.auditType = auditType);
    this.getAllAuditType1();
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
    if (this.checkSearch === '1' && this.auditType1 !== '') {
      this.auditTypeDService.searchAuditType(this.pagination.currentPage, this.pagination.itemsPerPage,
        this.auditType1, this.auditType2).subscribe((res: PaginatedResult<AuditTypeD[]>) => {
        this.auditTypes = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
    } else {
      this.auditTypeDService.getListAll(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe((res: PaginatedResult<AuditTypeD[]>) => {
        this.auditTypes = res.result;
        this.pagination = res.pagination;
        //    this.spinner.hide();
      }, error => {
        this.alertify.error(error);
      });
    }
  }
  search() {
    if (this.text !== '') {
      this.auditTypeDService.search(this.pagination.currentPage, this.pagination.itemsPerPage, this.text)
        .subscribe((res: PaginatedResult<AuditTypeD[]>) => {
          this.auditTypes = res.result;
          this.pagination = res.pagination;
        }, error => {
          this.alertify.error(error);
        });
    } else {
      this.load();
    }
  }
  add() {
    this.checkSearch = '0';
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

  // Khi Click chọn option selection Audit Type 1
  optionAuditType1() {
    // tslint:disable-next-line:no-var-keyword
    const ọbject = {
      audit_type_1: this.auditType1
    };
    if (this.auditType1 !== 'all') {
      this.auditTypeMService.getAuditsByAuditType1(ọbject).subscribe(res => {
        this.auditType2List = res;
        this.auditType2 = this.auditType2List[0].audit_Type2;
      });
    }
  }
  getAllAuditType1() {
    this.auditTypeMService.getAllAuditType1().subscribe(res => {
      this.auditType1List = res;
    });
  }
  searchAuditType() {
    this.checkSearch = '1';
    if (this.auditType1 === '' || this.auditType1 === undefined) {
      this.alertify.error('Please option Audit Type 1');
    } else {
      if (this.auditType1 === '精實系統/WS') {
         // tslint:disable-next-line:max-line-length
          this.auditTypeDService.search( this.pagination.currentPage, this.pagination.itemsPerPage, 'Audit0006').subscribe((res: PaginatedResult<AuditTypeD[]>) => {
          this.auditTypes = res.result;
          this.pagination = res.pagination;
        });
      } else if (this.auditType1 === 'Other') {
          // tslint:disable-next-line:max-line-length
          this.auditTypeDService.search( this.pagination.currentPage, this.pagination.itemsPerPage, 'Audit0009').subscribe((res: PaginatedResult<AuditTypeD[]>) => {
            this.auditTypes = res.result;
            this.pagination = res.pagination;
          });
      } else {
        // tslint:disable-next-line:max-line-length
        this.auditTypeDService.searchAuditType( this.pagination.currentPage, this.pagination.itemsPerPage,
          this.auditType1, this.auditType2).subscribe((res: PaginatedResult<AuditTypeD[]>) => {
          this.auditTypes = res.result;
          this.pagination = res.pagination;
        });
      }
    }
  }
}

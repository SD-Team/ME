import { Component, OnInit } from '@angular/core';
import { AuditRecDService } from '../../../../_core/_services/audit-rec-d.service';
import { AlertifyService } from '../../../../_core/_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuditRecViewModel } from '../../../../_core/_models/audit-rec-viewmodel';
import { User } from '../../../../_core/_models/user';
import { Pagination, PaginatedResult } from '../../../../_core/_models/pagination';
import { AuditRecMService } from '../../../../_core/_services/audit-rec-m.service';
import { AuditTypeService } from '../../../../_core/_services/audit-type.service';
import { AuditType } from '../../../../_core/_models/audit-type';

@Component({
  selector: 'app-audit-rec-d-list',
  templateUrl: './audit-rec-d-list.component.html',
  styleUrls: ['./audit-rec-d-list.component.scss']
})
export class AuditRecDListComponent implements OnInit {
  auditRecs: AuditRecViewModel[];
  user: User = JSON.parse(localStorage.getItem('user'));
  pagination: Pagination;
  text: string;
  searchKey = false;
  reportDate: any;
  statusList: string[] = [];
  buildings: string[] = [];
  lines: string[] = [];
  modelNos: string[] = [];
  pdcList: string[] = [];
  auditType1List: string[];
  auditType2List: AuditType[];
  building: string; line: string; status: string;
  model_Name: string; model_No = 'all';
  pdc: string;
  auditType1 = 'all';
  auditType2: string;
  time_start: string;
  time_end: string;
  constructor(private auditRecDService: AuditRecDService,
              private auditRecMService: AuditRecMService,
              private auditTypeMService: AuditTypeService,
              private alertify: AlertifyService,
              private router: Router,
              private route: ActivatedRoute,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getListStatus();
    this.getListBuilding();
    this.getListLine();
    this.getListModelNo();
    this.getListPDCs();
    this.getAllAuditType1();
    this.route.data.subscribe(data => {
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
      this.search();
    }
  }
  search() {
    if (this.time_start === undefined || this.time_end === undefined) {
      this.alertify.error('Please option start and end time');
    } else {
      // tslint:disable-next-line:prefer-const
      let form_date = new Date(this.time_start).toLocaleDateString();
      // tslint:disable-next-line:prefer-const
      let to_date = new Date(this.time_end).toLocaleDateString();
      this.searchKey = true;
      // tslint:disable-next-line:prefer-const
      let object = {
        pdc: this.pdc,
        status: this.status,
        building: this.building,
        line: this.line,
        model_Name: this.model_Name,
        model_No: this.model_No,
        audit_Type_1: this.auditType1,
        audit_Type_2: this.auditType2,
        from_Date: form_date,
        to_Date: to_date
      };
      this.auditRecDService.search(this.pagination.currentPage, this.pagination.itemsPerPage, object)
      .subscribe((res: PaginatedResult<AuditRecViewModel[]>) => {
        this.auditRecs = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
      }
  }
  exportExcel() {
    if (this.searchKey) {
      // tslint:disable-next-line:prefer-const
      let form_date = new Date(this.time_start).toLocaleDateString();
      // tslint:disable-next-line:prefer-const
      let to_date = new Date(this.time_end).toLocaleDateString();
      this.searchKey = true;
      // tslint:disable-next-line:prefer-const
      let object = {
        pdc: this.pdc,
        status: this.status,
        building: this.building,
        line: this.line,
        model_Name: this.model_Name,
        model_No: this.model_No,
        audit_Type_1: this.auditType1,
        audit_Type_2: this.auditType2,
        from_Date: form_date,
        to_Date: to_date
      };
      this.auditRecDService.getSearchExcel(object);
    } else {
      this.auditRecDService.getAllExcel();
    }
  }
  getListStatus() {
    this.auditRecDService.getListStatus().subscribe(res => {
      this.statusList = res;
      this.status = this.statusList[0];
    });
  }
  getListBuilding() {
    this.auditRecMService.getListBuilding().subscribe(res => {
      this.buildings = res;
      this.building = this.buildings[0];
    });
  }
  getListLine() {
    this.auditRecMService.getListLine().subscribe(res => {
      this.lines = res;
      this.line = this.lines[0];
    });
  }
  getListModelNo() {
    this.auditRecMService.getListModelNo().subscribe(res => {
      this.modelNos = res;
    });
  }
  getListPDCs() {
    this.auditRecMService.getListPDC().subscribe(res => {
      this.pdcList = res;
      this.pdc = this.pdcList[0];
    });
  }
  getAllAuditType1() {
    this.auditTypeMService.getAllAuditType1().subscribe(res => {
      this.auditType1List = res;
    });
  }
  // Khi Click chọn option selection Audit Type 1
  optionAuditType1(e) {
    this.auditType1 =  e.target.value;
    // tslint:disable-next-line:no-var-keyword
    const ọbject = {
      audit_type_1: this.auditType1
    };
    if (this.auditType1 === 'all') {
      this.auditType2 = '';
    } else {
      this.auditTypeMService.getAuditsByAuditType1(ọbject).subscribe(res => {
        this.auditType2List = res;
        this.auditType2 = this.auditType2List[0].audit_Type2;
      });
    }
  }
  addAuditRecM() {
    this.router.navigate(['/maintenance/audit-rec/add-audit-recM']);
  }
  // Khi Click chọn option selection Audit Type 2
  // optionAuditType2(e) {
  //   this.auditType2 = e.target.value;
  // }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.load();
  }
  OnDateChange(event): void {
    // tslint:disable-next-line:prefer-const
    let getDate = event.value._i;
    this.reportDate = getDate.year + '/' + getDate.month + '/' + getDate.date;
  }
}

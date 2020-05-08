// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// Components Routing
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { BrandListComponent } from './brands/brand-list/brand-list.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BrandAddComponent } from './brands/brand-add/brand-add.component';
import { TypeListComponent } from './audit-type/type-list/type-list.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TypeAddComponent } from './audit-type/type-add/type-add.component';
import { AuditTypeDListComponent } from './audit-type-d/audit-type-d-list/audit-type-d-list.component';
import { AuditTypeDAddComponent } from './audit-type-d/audit-type-d-add/audit-type-d-add.component';
import { AuditPicMListComponent } from './audit-pic-m/audit-pic-m-list/audit-pic-m-list.component';
import { AuditPicMAddComponent } from './audit-pic-m/audit-pic-m-add/audit-pic-m-add.component';
import { AuditPicDListComponent } from './audit-pic-d/audit-pic-d-list/audit-pic-d-list.component';
import { AuditPicDAddComponent } from './audit-pic-d/audit-pic-d-add/audit-pic-d-add.component';
import { AuditRecDListComponent } from './audit-rec-d/audit-rec-d-list/audit-rec-d-list.component';
import { AuditRecDAddComponent } from './audit-rec-d/audit-rec-d-add/audit-rec-d-add.component';
import { AuditRecMAddComponent } from './audit-rec-d/audit-rec-m-add/audit-rec-m-add.component';
import { AuditRecMListComponent } from './audit-rec-d/audit-rec-m-list/audit-rec-m-list.component';
import { AuditRecListComponent } from './audit-rec-d/audit-rec-list/audit-rec-list.component';
import { SmeScoreRecordListComponent } from './sme-score-record/sme-score-record-list/sme-score-record-list.component';
import { SixsScoreRecordListComponent } from './sixs-score-record/sixs-score-record-list/sixs-score-record-list.component';
import { WaterSpiderScoreRecordListComponent } from './water-spider-score-record/water-spider-score-record-list/water-spider-score-record-list.component';
import { SixsScoreRecordDetailComponent } from './sixs-score-record/sixs-score-record-detail/sixs-score-record-detail.component';
import { SmeScoreRecordDetailComponent } from './sme-score-record/sme-score-record-detail/sme-score-record-detail.component';
import { WaterSpiderScoreRecordDetailComponent } from './water-spider-score-record/water-spider-score-record-detail/water-spider-score-record-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MaintenanceRoutingModule,
    PaginationModule,
    NgSelectModule,
    BsDropdownModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [
    BrandListComponent,
    BrandAddComponent,
    TypeListComponent,
    TypeAddComponent,
    AuditTypeDListComponent,
    AuditTypeDAddComponent,
    AuditPicMListComponent,
    AuditPicMAddComponent,
    AuditPicDListComponent,
    AuditPicDAddComponent,
    AuditRecDListComponent,
    AuditRecDAddComponent,
    AuditRecMAddComponent,
    AuditRecMListComponent,
    AuditRecListComponent,
    SmeScoreRecordListComponent,
    SixsScoreRecordListComponent,
    WaterSpiderScoreRecordListComponent,
    SixsScoreRecordDetailComponent,
    SmeScoreRecordDetailComponent,
    WaterSpiderScoreRecordDetailComponent
  ],
})
export class MaintenanceModule {}

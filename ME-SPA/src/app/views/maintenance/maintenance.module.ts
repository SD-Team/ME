// Angular
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
// Components Routing
import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { BrandListComponent } from './brands/brand-list/brand-list.component';
import { PaginationModule } from 'ngx-bootstrap';
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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    MaintenanceRoutingModule,
    PaginationModule,
    NgSelectModule
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
    AuditRecDAddComponent
  ]
})
export class MaintenanceModule {}

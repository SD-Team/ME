import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandListComponent } from './brands/brand-list/brand-list.component';
import { BrandListResolver } from '../../_core/_resolvers/brand-list.resolver';
import { BrandAddComponent } from './brands/brand-add/brand-add.component';
import { TypeListComponent } from './audit-type/type-list/type-list.component';
import { TypeAddComponent } from './audit-type/type-add/type-add.component';
import { AuditTypeListResolver } from '../../_core/_resolvers/audit-type-list.resolver';
import { AuditTypeDListResolver } from '../../_core/_resolvers/audit-typeD-list.resolver';
import { AuditTypeDListComponent } from './audit-type-d/audit-type-d-list/audit-type-d-list.component';
import { AuditTypeDAddComponent } from './audit-type-d/audit-type-d-add/audit-type-d-add.component';
import { AuditPicMListComponent } from './audit-pic-m/audit-pic-m-list/audit-pic-m-list.component';
import { AuditPicMListResolver } from '../../_core/_resolvers/audit-pic-m-list.resolver';
import { AuditPicMAddComponent } from './audit-pic-m/audit-pic-m-add/audit-pic-m-add.component';
import { AuditPicDListComponent } from './audit-pic-d/audit-pic-d-list/audit-pic-d-list.component';
import { AuditPicDListResolver } from '../../_core/_resolvers/audit-pic-d-list.resolver';
import { AuditPicDAddComponent } from './audit-pic-d/audit-pic-d-add/audit-pic-d-add.component';
import { AuditRecDListComponent } from './audit-rec-d/audit-rec-d-list/audit-rec-d-list.component';
import { AuditRecViewModelListResolver } from '../../_core/_resolvers/audit-rec-viewmodel-list.resolver';
import { AuditRecDAddComponent } from './audit-rec-d/audit-rec-d-add/audit-rec-d-add.component';
import { AuditRecMAddComponent } from './audit-rec-d/audit-rec-m-add/audit-rec-m-add.component';
import { AuditRecMListComponent } from './audit-rec-d/audit-rec-m-list/audit-rec-m-list.component';
import { AuditRecMListResolver } from '../../_core/_resolvers/audit-rec-m-list.resolver';
import { AuditRecListComponent } from './audit-rec-d/audit-rec-list/audit-rec-list.component';
import { AuditRecDListResolver } from '../../_core/_resolvers/audit-rec-d-list-resolver';



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Maintenance'
    },
    children: [
      {
        path: 'brand',
        children:
          [
            {
              path: '',
              component: BrandListComponent,
              resolve: { brands: BrandListResolver },
              data: {
                title: 'Brand'
              }
            },
            {
              path: 'add',
              component: BrandAddComponent,
              data: {
                title: 'Add new brand'
              }
            }
          ]
      },
      {
        path: 'audit-type',
        children:
          [
            {
              path: '',
              component: TypeListComponent,
              resolve: { auditTypes: AuditTypeListResolver },
              data: {
                title: 'Audit Types'
              }
            },
            {
              path: 'add',
              component: TypeAddComponent,
              data: {
                title: 'Add new audit type'
              }
            }
          ]
      },
      {
        path: 'audit-type-d',
        children:
          [
            {
              path: '',
              component: AuditTypeDListComponent,
              resolve: { auditTypes: AuditTypeDListResolver },
              data: {
                title: 'Audit Types D'
              }
            },
            {
              path: 'add',
              component: AuditTypeDAddComponent,
              data: {
                title: 'Add new audit type'
              }
            }
          ]
      },
      {
        path: 'audit-pic-m',
        children:
          [
            {
              path: '',
              component: AuditPicMListComponent,
              resolve: { auditPics: AuditPicMListResolver },
              data: {
                title: 'Audit Pic M'
              }
            },
            {
              path: 'add',
              component: AuditPicMAddComponent,
              data: {
                title: 'Add new audit Pic M'
              }
            }
          ]
      },
      {
        path: 'audit-pic-d',
        children:
          [
            {
              path: '',
              component: AuditPicDListComponent,
              resolve: { auditPics: AuditPicDListResolver },
              data: {
                title: 'Audit Pic D'
              }
            },
            {
              path: 'add',
              component: AuditPicDAddComponent,
              data: {
                title: 'Add new audit Pic D'
              }
            }
          ]
      },
      {
        path: 'audit-rec',
        children:
          [
            {
              path: '',
              component: AuditRecListComponent,
              resolve: { auditRecs: AuditRecViewModelListResolver },
              data: {
                title: 'Audit Rec'
              }
            },
            {
              path: 'audit-recM-list',
              component: AuditRecMListComponent,
              resolve: { auditRecMs: AuditRecMListResolver },
              data: {
                title: 'List audit Rec M'
              }
            },
            {
              path: 'audit-recD-list',
              component: AuditRecDListComponent,
              resolve: { auditRecDs: AuditRecDListResolver },
              data: {
                title: 'List audit Rec D'
              }
            },
            {
              path: 'add-audit-recM',
              component: AuditRecMAddComponent,
              data: {
                title: 'Add new audit Rec M'
              }
            },
            {
              path: 'add-audit-recD',
              component: AuditRecDAddComponent,
              data: {
                title: 'Add new audit Rec D'
              }
            }
          ]
      },
    ]
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MaintenanceRoutingModule { }

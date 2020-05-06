import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SixsScoreRecordAddComponent } from './sixs-score-record-add/sixs-score-record-add.component';
import { SmeScoreRecordAddComponent } from './sme-score-record-add/sme-score-record-add.component';
import { WaterSpiderScoreRecordAddComponent } from './water-spider-score-record-add/water-spider-score-record-add.component';
import { ScoreRecordRoutingModulle } from './score-record-routing.module';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        PaginationModule,
        NgSelectModule,
        ScoreRecordRoutingModulle,
        BsDropdownModule,
        BsDatepickerModule.forRoot(),
    ],
    declarations: [
        SixsScoreRecordAddComponent,
        SmeScoreRecordAddComponent,
        WaterSpiderScoreRecordAddComponent],
})

export class ScoreRecordModule { }
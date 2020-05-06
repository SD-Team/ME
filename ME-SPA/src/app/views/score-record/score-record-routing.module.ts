import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SixsScoreRecordAddComponent } from './sixs-score-record-add/sixs-score-record-add.component';


const routes: Routes = [
    {
        path:'6s-scored-record-add',
        component: SixsScoreRecordAddComponent,
    },
    {
        path:'sms-scored-record-add',
        component: SixsScoreRecordAddComponent,
    },
    {
        path:'water-spider-scored-record-add',
        component: SixsScoreRecordAddComponent,
    },
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ScoreRecordRoutingModulle { }
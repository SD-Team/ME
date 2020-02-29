import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuditPicDService } from '../_services/audit-pic-d.service';
import { AuditPicD } from '../_models/audit-pic-d';

@Injectable()
export class AuditPicDListResolver implements Resolve<AuditPicD[]> {
    pageNumber = 1;
    pageSize = 3;
    constructor(    private auditPicMService: AuditPicDService,
                    private router: Router,
                    private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<AuditPicD[]> {
        return this.auditPicMService.getListAll(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/dashboard']);
                return of(null);
            }),
        );
    }
}

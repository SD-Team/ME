import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuditPicD } from '../_models/audit-pic-d';
import { AuditRecDService } from '../_services/audit-rec-d.service';

@Injectable()
export class AuditPicDListResolver implements Resolve<AuditPicD[]> {
    pageNumber = 1;
    pageSize = 3;
    constructor(    private auditRecDService: AuditRecDService,
                    private router: Router,
                    private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): Observable<AuditPicD[]> {
        return this.auditRecDService.getListRecDs(this.pageNumber, this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/dashboard']);
                return of(null);
            }),
        );
    }
}

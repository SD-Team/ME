import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { AuditRecViewModel } from '../_models/audit-rec-viewmodel';
import { map } from 'rxjs/operators';
import { AuditRecSearch } from '../_models/audit-rec-search';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  }),
};
@Injectable({
  providedIn: 'root'
})
export class AuditRecDService {
  baseUrl = environment.apiUrl;
  auditRecDSource = new BehaviorSubject<Object>({});
  currentAuditPicD = this.auditRecDSource.asObservable();
  flagSource = new BehaviorSubject<string>('0');
  currentFlag = this.flagSource.asObservable();
  constructor(private http: HttpClient) { }
  getListAll(page?, itemsPerPage?): Observable<PaginatedResult<AuditRecViewModel[]>> {
    const paginatedResult: PaginatedResult<AuditRecViewModel[]> = new PaginatedResult<AuditRecViewModel[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<AuditRecViewModel[]>(this.baseUrl + 'auditRecD', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
    );
  }
  search(page?, itemsPerPage?, auditRecSearch?: AuditRecSearch): Observable<PaginatedResult<AuditRecViewModel[]>> {
    const paginatedResult: PaginatedResult<AuditRecViewModel[]> = new PaginatedResult<AuditRecViewModel[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    // tslint:disable-next-line:prefer-const
    let url = this.baseUrl + 'auditRecD/searchModel/';
    return this.http.post<any>(url , auditRecSearch , { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
  }
  getListStatus() {
    return this.http.get<any>(this.baseUrl + 'auditRecD/status', {});
  }
}

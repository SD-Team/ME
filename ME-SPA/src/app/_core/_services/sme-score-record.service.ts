import { AuditRateSme } from './../_models/audit-rate-sme';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AuditRateSearch } from '../_models/audit-rate-search';
import { Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/internal/operators/map';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  }),
};
@Injectable({
  providedIn: 'root'
})
export class SmeScoreRecordService {
  baseUrl = environment.apiUrl;
  scoreSmeSource = new BehaviorSubject<Object>({});
  currentScore6S = this.scoreSmeSource.asObservable();
  flagSource = new BehaviorSubject<string>('0');
  currentFlag = this.flagSource.asObservable();

  constructor(private http: HttpClient) { }
  search(page?, itemsPerPage?, auditRateSearch?: AuditRateSearch): Observable<PaginatedResult<AuditRateSme[]>> {
    const paginatedResult: PaginatedResult<AuditRateSme[]> = new PaginatedResult<AuditRateSme[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    let url = this.baseUrl + 'AuditRate/sme-list';
    // return this.http.post<any>(url,auditRateSearch,{params});
    return this.http.post<any>(url, auditRateSearch, { observe: 'response', params })
      .pipe(
        map(response => {
          console.log(response);
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }),
      );
  }
  getListPDC(){
    return this.http.get<any>(this.baseUrl + 'AuditRecM/pdcs');
  }
  getListBuilding()
  {
    return this.http.get<any>(this.baseUrl + 'AuditRecM/buildings');
  }
  getListLine()
  {
    return this.http.get<any>(this.baseUrl + 'AuditRecM/lines');
  }
  getAuditType2()
  {
    return this.http.get<any>(this.baseUrl + 'AuditType/audittype2');
  }
}

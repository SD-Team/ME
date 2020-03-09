import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { AuditPicD } from '../_models/audit-pic-d';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  }),
};
@Injectable({
  providedIn: 'root'
})
export class AuditPicDService {
  baseUrl = environment.apiUrl;
  auditPicDSource = new BehaviorSubject<Object>({});
  currentAuditPicD = this.auditPicDSource.asObservable();
  flagSource = new BehaviorSubject<string>('0');
  currentFlag = this.flagSource.asObservable();
  constructor(private http: HttpClient) { }
  getListAll(page?, itemsPerPage?): Observable<PaginatedResult<AuditPicD[]>> {
    const paginatedResult: PaginatedResult<AuditPicD[]> = new PaginatedResult<AuditPicD[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<AuditPicD[]>(this.baseUrl + 'auditPicD', { observe: 'response', params })
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
  search(page?, itemsPerPage?, text?): Observable<PaginatedResult<AuditPicD[]>> {
    const paginatedResult: PaginatedResult<AuditPicD[]> = new PaginatedResult<AuditPicD[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<AuditPicD[]>(this.baseUrl + 'auditPicD/search/' + text, { observe: 'response', params })
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
  getAllPdPic() {
    return this.http.get(this.baseUrl + 'auditPicD/allPdPic', {});
  }
  getAllMePic() {
    return this.http.get(this.baseUrl + 'auditPicD/allMePic', {});
  }
  create(auditPicD: AuditPicD) {
    return this.http.post(this.baseUrl + 'auditPicD/', auditPicD);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'auditPicD/' + id, {});
  }
  update(auditPicD: AuditPicD) {
    return this.http.put(this.baseUrl + 'auditPicD/', auditPicD);
  }
  changeAuditPicD(auditPicD: AuditPicD) {
    this.auditPicDSource.next(auditPicD);
  }
  changeFlag(flag: string) {
    this.flagSource.next(flag);
  }
}

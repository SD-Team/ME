import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { AuditRate6S } from '../_models/audit-rate-6s';
import { map } from 'rxjs/operators';
import { AuditRateSearch } from '../_models/audit-rate-search';
import { ScoreRecordQuestion, AuditRateModel } from '../_models/score-record-question';
import { ScoreRecordDetail } from '../_models/score-record-detail';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  }),
};
@Injectable({
  providedIn: 'root'
})
export class ScoreRecordService {
  baseUrl = environment.apiUrl;
  score6SSource = new BehaviorSubject<Object>({});
  currentScore6S = this.score6SSource.asObservable();
  recordId = new BehaviorSubject<string>('0');
  currentRecordId = this.recordId.asObservable();

  constructor(private http: HttpClient) { }
  search(page?, itemsPerPage?, auditRateSearch?: AuditRateSearch): Observable<PaginatedResult<AuditRate6S[]>> {
    const paginatedResult: PaginatedResult<AuditRate6S[]> = new PaginatedResult<AuditRate6S[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    let url = this.baseUrl + 'SixsRecord/sixs-list';
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
  exportExcel(auditRateSearch?: AuditRateSearch){
    return this.http.post(this.baseUrl + 'SixsRecord/ExportExcelSixs', auditRateSearch, { responseType: 'blob' })
      .subscribe((result: Blob) => {
        if (result.type !== 'application/xlsx') {
          alert(result.type);
        }
        const blob = new Blob([result]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        const currentTime = new Date();
        const filename = '6S_Score_Record_' + currentTime.getFullYear().toString() +
          (currentTime.getMonth() + 1) + currentTime.getDate() +
          currentTime.toLocaleTimeString().replace(/[ ]|[,]|[:]/g, '').trim() + '.xlsx';
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      });
  }
  getListPDC(){
    return this.http.get<any>(this.baseUrl + 'AuditRate/pdcs', {});
  }
  getListBuilding()
  {
    return this.http.get<any>(this.baseUrl + 'AuditRate/buildings', {});
  }
  getListLine()
  {
    return this.http.get<any>(this.baseUrl + 'AuditRate/lines', {});
  }
  getAuditType2()
  {
    return this.http.get<any>(this.baseUrl + 'AuditRate/audittype2by6s', {});
  }
  getAuditType2Score()
  {
    return this.http.get<any>(this.baseUrl + 'AuditType/audittype2by6s', {});
  }

  getQuestion(auditType1: string, auditType2: string) {
    debugger
    return this.http.get<ScoreRecordQuestion[]>(this.baseUrl + 'AuditRate/GetListQuesRecord', {params : {
      auditType1: auditType1,
      auditType2: auditType2
    }});
  }

  saveScoreRecord(param: AuditRateModel) {
    return this.http.post(this.baseUrl + 'AuditRate/save', param);
  }


  getDetailScoreRecord(recordId: string) {
    return this.http.get<ScoreRecordDetail>(this.baseUrl + 'AuditRate/detail/' + recordId);
  }
  changeRecordId(recordId: string) {
    this.recordId.next(recordId);
  }

  uploadPicture(formData: FormData) {
    return this.http.post(this.baseUrl + 'AuditRate/upload', formData);
  }
}

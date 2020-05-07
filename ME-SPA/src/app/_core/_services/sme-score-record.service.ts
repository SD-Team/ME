import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
  constructor(private http: HttpClient) { }
  getListPDC() {
    return this.http.get<any>(this.baseUrl + 'AuditRecM/pdcs', {});
  }
  getListBuilding()
  {
    return this.http.get<any>(this.baseUrl + 'AuditRecM/buildings', {});
  }
  getListLine()
  {
    return this.http.get<any>(this.baseUrl + 'AuditRecM/lines', {});
  }
  getAuditType2()
  {
    return this.http.get<any>(this.baseUrl + 'AuditType/audittype2', {});
  }

  getListAllSmeScore() {
    return this.http.get<any>(this.baseUrl + 'AuditType/audittype2', {});
  }
}

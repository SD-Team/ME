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
export class ScoreRecordService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
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
    return this.http.get<any>(this.baseUrl + 'AuditRate/audittype2', {});
  }
}

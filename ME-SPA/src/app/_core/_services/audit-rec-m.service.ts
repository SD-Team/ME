import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuditRecM } from '../_models/audit-rec-m';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  }),
};
@Injectable({
  providedIn: 'root'
})
export class AuditRecMService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getListBuilding() {
    return this.http.get<any>(this.baseUrl + 'auditRecM/buildings', {});
  }
  getListLine() {
    return this.http.get<any>(this.baseUrl + 'auditRecM/lines', {});
  }
  getListModelName() {
    return this.http.get<any>(this.baseUrl + 'auditRecM/modelNames', {});
  }
  getListModelNo() {
    return this.http.get<any>(this.baseUrl + 'auditRecM/modelNos', {});
  }
  getListPDC() {
    return this.http.get<any>(this.baseUrl + 'auditRecM/pdcs', {});
  }
  create(auditRecM: AuditRecM) {
    return this.http.post(this.baseUrl + 'auditRecM/', auditRecM);
  }
}

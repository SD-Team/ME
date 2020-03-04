import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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
}

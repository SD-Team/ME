import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MesOrgService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  getAllPdc() {
    return this.http.get<any>(this.baseUrl + 'mesOrg/allPdc', {});
  }
  getAllBuilding() {
    return this.http.get<any>(this.baseUrl + 'mesOrg/allBuilding', {});
  }
  getAllLineId() {
    return this.http.get<any>(this.baseUrl + 'mesOrg/allLineID', {});
  }

}

import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { PaginatedResult } from '../_models/pagination';
import { AuditRecViewModel } from '../_models/audit-rec-viewmodel';
import { map } from 'rxjs/operators';
import * as ExcelJS from 'exceljs/dist/exceljs';
import * as fs from 'file-saver';
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
  allAuditRecD: AuditRecViewModel[] = [];
  constructor(private http: HttpClient) { }
  getListAll(page?, itemsPerPage?): Observable<PaginatedResult<AuditRecViewModel[]>> {
    const paginatedResult: PaginatedResult<AuditRecViewModel[]> = new PaginatedResult<AuditRecViewModel[]>();
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<AuditRecViewModel[]>(this.baseUrl + 'auditRecD/all', { observe: 'response', params })
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
 async getAllExcel() {
    this.http.get<AuditRecViewModel[]>(this.baseUrl + 'auditRecD/allExcel').subscribe(res => {
      this.allAuditRecD = res;
      const data =  this.allAuditRecD.map(item => {
        delete item.audit_Type_ID;
        delete item.before_Picture;
        delete item.after_Picture;
        return item;
      });
      console.log(data);
      const header = ['Record_ID', 'Record_Time', 'PDC', 'Building', 'Line', 'Model_Name', 'Model_No',
                    'Chief', 'Recorder', 'Attendees', 'Item_No', 'ERCS', 'Audit_Type',
                    'Audit_Item', 'Issue_ZW', 'Issue_LL', 'Issue_EN', 'PD_PIC', 'PD_RESP',
                    'ME_PIC', 'Finished_Date', 'Status', 'Remark', 'Updated_By', 'Updated_Time',
                    'Implement_By', 'Implement_Time'
                    ];

      // Create workbook and worksheet
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Export Excel');
        // Add header Row
        const headerRow = worksheet.addRow(header);
        // Cell Style : Fill and Border
          headerRow.font = {
            size: 12,
      };
       // tslint:disable-next-line:variable-name
      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '33ff33' },
          bgColor: { argb: '33ff33' }
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
      // Add Data and Conditional Formatting
      data.forEach(d => {
        const row = worksheet.addRow(d);
      });
      // tslint:disable-next-line:no-shadowed-variable
      workbook.xlsx.writeBuffer().then((data: any) => {
        const blob = new Blob([data], {
          type:
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        fs.saveAs(blob, 'Export Excel ME.xlsx');
      });
    });
  }
  async generateExcel() {
    this.http.get<AuditRecViewModel[]>(this.baseUrl + 'auditRecD/allExcel').subscribe(res => {
      const header = ['Record_ID', 'Record_Time', 'PDC', 'Building', 'Line', 'Model_Name', 'Model_No',
      'Chief', 'Recorder', 'Attendees', 'Item_No', 'ERCS', 'Audit_Type',
      'Audit_Item', 'Issue_ZW', 'Issue_LL', 'Issue_EN', 'PD_PIC', 'PD_RESP',
      'ME_PIC', 'Finished_Date', 'Status', 'Remark', 'Updated_By', 'Updated_Time',
      'Implement_By', 'Implement_Time'
      ];
      this.allAuditRecD = res;
      this.allAuditRecD.map(item => {
        delete item.audit_Type_ID;
        delete item.before_Picture;
        delete item.after_Picture;
      });
      // tslint:disable-next-line:prefer-const
      let arr = [];
      this.allAuditRecD.forEach(item => {
        // tslint:disable-next-line:prefer-const
        let itemConvert = [];
        itemConvert[0] = item.record_ID; itemConvert[1] = item.record_Time; itemConvert[2] = item.pdc;
        itemConvert[3] = item.building; itemConvert[4] = item.line; itemConvert[5] = item.model_Name;
        itemConvert[6] = item.model_No; itemConvert[7] = item.chief; itemConvert[8] = item.recorder;
        itemConvert[9] = item.attendees; itemConvert[10] = item.item_no; itemConvert[11] = item.ercs;
        itemConvert[12] = item.audit_Type; itemConvert[13] = item.audit_Item; itemConvert[14] = item.issue_ZW;
        itemConvert[15] = item.issue_LL; itemConvert[16] = item.issue_EN; itemConvert[17] = item.pD_PIC;
        itemConvert[18] = item.pD_RESP; itemConvert[19] = item.mE_PIC; itemConvert[20] = item.finished_Date;
        itemConvert[21] = item.status; itemConvert[22] = item.remark; itemConvert[23] = item.updated_By;
        itemConvert[24] = item.updated_Time; itemConvert[25] = item.implement_User; itemConvert[26] = item.implement_Time;
        arr.push(itemConvert);
      });
    // Create workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('ME');
        // Add header Row
        const headerRow = worksheet.addRow(header);
        // Cell Style : Fill and Border
          headerRow.font = {
            size: 12,
      };
       // tslint:disable-next-line:variable-name
      headerRow.eachCell((cell, number) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '33ff33' },
          bgColor: { argb: '33ff33' }
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' }
        };
      });
      // Add Data and Conditional Formatting
      arr.forEach(d => {
        const row = worksheet.addRow(d);
      });
      worksheet.getColumn(1).width = 17;
      worksheet.getColumn(2).width = 17;
      worksheet.getColumn(3).width = 17;
      worksheet.getColumn(10).width = 30;
      worksheet.getColumn(15).width = 30;
      worksheet.getColumn(16).width = 30;
      worksheet.getColumn(17).width = 30;
      const countAudit = arr.length;
      for (let i = 1; i < countAudit + 2; i ++) {
        worksheet.getCell('K' + i).alignment = { wrapText: true };
        worksheet.getCell('O' + i).alignment = { wrapText: true };
        worksheet.getCell('P' + i).alignment = { wrapText: true };
        worksheet.getCell('Q' + i).alignment = { wrapText: true };
      }
      // Generate Excel File with given name
      // tslint:disable-next-line:no-shadowed-variable
      workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'ME.xlsx');
      });
    });
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

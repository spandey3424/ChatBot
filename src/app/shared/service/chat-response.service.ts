import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ChatResponseService {
  bufferData: any;
  setExcelData(data: any) {
    this.bufferData = data;
  }
  constructor(private http: HttpClient) {}

  // getJsonData(input: string) {
  //   return this.http.get('assets/json/bar.json');
  // }

  //API request endpoint for usecase1
  getJsonData(input: string) {
    // Define your query parameters
    const headerOptions = new HttpHeaders();

    headerOptions.set('Content-Type', 'application/json');

    let obj = {
      text: input,
    };
    return this.http.post('/process_text', obj, { headers: headerOptions });
  }

  // getExcelData(url: string): Observable<any> {
  //       // Define your query parameters
  //       const headerOptions = new HttpHeaders();

  //       headerOptions.set('Content-Type', 'application/json');
  //   return this.http.get(url, {
  //     responseType: 'arraybuffer',
  //   });
  // }

  getExcelData(url: string): Observable<any> {
    // Define your query parameters
    const headerOptions = new HttpHeaders();

    headerOptions.set('Content-Type', 'application/json');
    return this.http.get('/get_excel_data', { headers: headerOptions });
  }

  // getSummary() {
  //   return this.http.get('assets/json/summary.json');
  // }

  // getdocSummary(input: any ) {
  //   return this.http.get('assets/json/bulletsummary.json')
  // }

  //API request endpoint for usecase2
  getSummary() {
    // Define your query parameters
    const headerOptions = new HttpHeaders();

    headerOptions.set('Content-Type', 'application/json');

    return this.http.post('/text_summary', { headers: headerOptions });
  }

  getdocSummary(input: string) {
    //Define your query parameters
    const headerOptions = new HttpHeaders();

    headerOptions.set('Content-Type', 'application/json');

    let obj = {
      text: input,
    };
    return this.http.post('/qa_doc_summary', obj, { headers: headerOptions });
  }

  getBrokenImages() {
    const headerOptions = new HttpHeaders();

    headerOptions.set('Content-Type', 'application/json');
    return this.http.post('/similar_images', { headers: headerOptions });
  }

  downloadFile(title: string, fileType: string) {
    const workbook = XLSX.read(new Uint8Array(this.bufferData), {
      type: 'array',
    });
    XLSX.writeFile(workbook, `${title}.${fileType}`);
  }
}

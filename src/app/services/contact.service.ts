import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Contact } from '../models/contact';

const apiUrl = '/contact'; //api url from backend service


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }


  getMessage(): Observable<Contact[]> {
    return this.http
      .get<Contact[]>(apiUrl)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  sendMessage(name, subject, content, email): Observable<any> {
    let data = JSON.stringify({
      "name": name,
      "subject": subject,
      "content": content,
      "email": email,
    })

    const params = new HttpParams();

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = {
      params,
      reportProgress: true,
      headers: headers,
    };

    const req = new HttpRequest('POST', apiUrl , data, options);
    
    return this.http.request(req);
  }


  deleteContact(id) {
    const params = new HttpParams();

    const header = new HttpHeaders({
      Authorization: 'bearer ' + sessionStorage.getItem('token'),
    });

    const options = {
      params,
      reportProgress: true,
      headers: header,
    };
    const req = new HttpRequest('DELETE', apiUrl + '/' + id , options);
    return this.http.request(req);

  }

  
  sendReceipt(emailDetail) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(emailDetail),
    };

    console.log(JSON.stringify(emailDetail))

    fetch(apiUrl + '/supportReply', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }


}

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

const apiUrl = 'http://localhost:3000/users'; //api url from backend service

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    //'Authorization': 'bearer ' + sessionStorage.getItem('token')
 });
 headersWithAuth = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': 'bearer ' + sessionStorage.getItem('token')
});
  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
    ) {}
  public getUserDetails() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    return user;
  }

  getUsers(): Observable<any[]> {
    return this.http
      .get<any[]>(apiUrl, {headers: this.headersWithAuth})
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  updateVerification(id, status) {
    let data = JSON.stringify({
      "verified": status,
    })

    const params = new HttpParams();
    let headersWithAuth = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + sessionStorage.getItem('token')
    });
    const options = {
      params,
      reportProgress: true,
      headers: headersWithAuth,
    };
    const req = new HttpRequest('PUT', apiUrl + '/' + id ,data, options);
    return this.http.request(req);
  }

  updateAdminStatus(id, status) {
    let data = JSON.stringify({
      "admin": status,
    })

    const params = new HttpParams();
    let headersWithAuth = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + sessionStorage.getItem('token')
    });
    const options = {
      params,
      reportProgress: true,
      headers: headersWithAuth,
    };
    const req = new HttpRequest('PUT', apiUrl + '/' + id ,data, options);
    return this.http.request(req);
  }
  public isAuthenticated(): Boolean {
    let token = sessionStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  public setUserInfo(token,user) {
    sessionStorage.setItem('token',token);
    sessionStorage.setItem('user',JSON.stringify(user));
  }

  public validate(username, password) {
    return this.http
      .post('http://localhost:3000/users/login', {
        username: username,
        password: password,
      })
      .toPromise();
  }
  public deleteUser(userId) {
    const params = new HttpParams();

    const header = new HttpHeaders({
      Authorization: 'bearer ' + sessionStorage.getItem('token'),
    });

    const options = {
      params,
      reportProgress: true,
      headers: header,
    };
    const req = new HttpRequest('DELETE', apiUrl + '/' + userId , options);
    return this.http.request(req);
  }
  public register(username,password,name,contactNumber,birthday,email):Observable<any> {
    console.log( username)
    console.log( password)
    console.log( name)
    console.log( contactNumber)
    console.log( birthday)
    console.log( email)
    
    let data = JSON.stringify({
      "username": username,
      "password": password,
      "name": name,
      "contactNumber": contactNumber,
      "birthday": birthday,
      "email": email,
      "admin": false,
      "verified": false
    });
    console.log(data)



    const params = new HttpParams();
    let myHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
      //'Authorization': 'bearer ' + sessionStorage.getItem('token')
   });
    const options = {
      params,
      reportProgress: true,
      headers: myHeaders,
    };
    const req = new HttpRequest('POST', apiUrl + '/signup',data, options);
    return this.http.request(req);

  }

  public clear() {
    sessionStorage.clear();
  }


}

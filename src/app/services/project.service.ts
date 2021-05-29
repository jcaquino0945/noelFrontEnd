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
import { Project } from '../models/project';
import { Comment } from '../models/comment';


const apiUrl = '/projects'; //api url from backend service
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    //'Authorization': 'bearer ' + sessionStorage.getItem('token')
  });
  headersWithAuth = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': 'bearer ' + sessionStorage.getItem('token')
});
  constructor(
    private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService
  ) { }

  updateProjectVideo(id,value):Observable<any> {
    let data = JSON.stringify({
      "videos": value,
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
  updateProjectAudio(id,value):Observable<any> {
    let data = JSON.stringify({
      "audio": value,
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
  updateProjectImage(id,value):Observable<any> {
    let data = JSON.stringify({
      "images": value,
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
  updateProjectText(id,value):Observable<any> {
    let data = JSON.stringify({
      "textFiles": value,
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
  editProject(id,name, description):Observable<any> {
    let data = JSON.stringify({
      "name": name,
      "description": description,
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
  getProjects(): Observable<Project[]> {
    return this.http
      .get<Project[]>(apiUrl)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }

  getProject(id: string): Observable<Project> {
    return this.http
      .get<Project>(apiUrl + '/' + id)
      .pipe(catchError(this.processHTTPMsgService.handleError));
  }
  
  
  deleteComment(commentId,userId,projectId) {
    let data = JSON.stringify({
      "_id": userId,
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

    const req = new HttpRequest('DELETE', apiUrl + '/' + projectId + '/comments/' + commentId,data, options);
    return this.http.request(req);
  }

  getProjectIds(): Observable<number[] | any> {
    return this.getProjects()
      .pipe(map((projects) => projects.map((projects) => projects._id)))
      .pipe(catchError((error) => error));
  }

  addComment(id,comment,author,file?:File):Observable<any> {
    const formData = new FormData();
    console.log(typeof id)
    console.log(typeof comment)
    console.log(typeof author)
    console.log(typeof file)


    if (!file) {
      formData.append('comment',comment);
      formData.append('author',author)

      const params = new HttpParams();
      const header = new HttpHeaders({
        Authorization: 'bearer ' + sessionStorage.getItem('token'),
      });
    const options = {
      params,
      reportProgress: true,
      headers: header,
    };
    const req = new HttpRequest('POST', apiUrl + '/' + id + '/comments', formData, options);
    return this.http.request(req);
    } else {
      formData.append('fileName', file);
      formData.append('comment',comment);
      formData.append('author',author)

      const params = new HttpParams();

      const header = new HttpHeaders({
        Authorization: 'bearer ' + sessionStorage.getItem('token'),
      });

    const options = {
      params,
      reportProgress: true,
      headers: header,
    };
    const req = new HttpRequest('POST', apiUrl + '/' + id + '/comments', formData, options);
    return this.http.request(req);
    }
  }
  deleteProject(id,author) {
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

  addProject(name,description,author,file:File):Observable<any> {
    const formData = new FormData();
   
    formData.append('description', description);
    formData.append('fileName', file);
    formData.append('name',name);
    formData.append('author',author)

    const params = new HttpParams();

    const header = new HttpHeaders({
      Authorization: 'bearer ' + sessionStorage.getItem('token'),
    });

    const options = {
      params,
      reportProgress: true,
      headers: header,
    };
    const req = new HttpRequest('POST', apiUrl , formData, options);
    return this.http.request(req);
    }
}

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


const apiUrl = 'http://localhost:3000/projects'; //api url from backend service
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

  addProject(project: Project, file: File, sizes: any): Observable<any> {
    const formData = new FormData();
    // formData.append('imageTitle', gallery.imageTitle);
    // formData.append('sizes', JSON.stringify(sizes));
    


    /*
    formData.append('file', file);
    formData.append('orders', product.orders.toString());
    formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('stock_quantity', JSON.stringify(product.stock_quantity));
    formData.append('featured', JSON.stringify(product.featured));
    */
    //const header = new HttpHeaders();
    const params = new HttpParams();
    /*
    const header = new HttpHeaders({
      Authorization: 'bearer ' + sessionStorage.getItem('token'),
    });
    */
    const options = {
      params,
      reportProgress: true,
      headers: this.headers,
    };
    const req = new HttpRequest('POST', apiUrl, formData, options);
    return this.http.request(req);
  }


}

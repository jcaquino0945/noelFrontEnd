import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}
  public getUserDetails() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    return user;

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

  public clear() {
    sessionStorage.clear();
  }


}

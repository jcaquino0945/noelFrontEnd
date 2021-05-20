import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public isAuthenticated(): Boolean {
    console.log(sessionStorage.getItem('user'))
    console.log(sessionStorage.getItem('token'))

    let user = sessionStorage.getItem('user');
    let token = sessionStorage.getItem('token');
    if (token && user) {
      return true;
    }
    return false;
  }

  public setUserInfo(token,user) {
    console.log(token);
    console.log(user)
    sessionStorage.setItem('token',token);
    sessionStorage.setItem('user',user);

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

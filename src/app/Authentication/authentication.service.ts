import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  islloggedin = false;
  loginsub = new Subject();
  loginhttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
  };
  loginurl = 'http://13.232.8.87:8082/api/session'
  constructor(private http: HttpClient) { }

  login(data) {
    let body = new URLSearchParams();
    body.set('email', data.email);
    body.set('password', data.password);

    let promise = new Promise((resolve, reject) => {
      this.http.post(this.loginurl, body.toString(), this.loginhttpOptions).subscribe((data) => {
        if (data) {
          this.settologgedin(data);
          this.setUser(data);

        }
        resolve(data);
      }, (error) => {
        console.log('login error is ', data)

        reject(error);
      })
    });
    return promise;
  }

  settologgedin(data) {
    this.islloggedin = true;
    this.loginsub.next(this.islloggedin);
  }
  onlogout() {

    this.islloggedin = false;
    this.loginsub.next(this.islloggedin);
    this.clearUser();
  }

  setUser(data: any) {
    sessionStorage.setItem('currentuser', JSON.stringify(data));
  }

  getUser() {
    return JSON.parse(sessionStorage.getItem('currentuser'));
  }

  clearUser() {
    return sessionStorage.removeItem('currentuser');
  }

}

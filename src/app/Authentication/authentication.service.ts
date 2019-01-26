import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  Body;
  islloggedin = false;
  loginsub = new Subject();
  loginhttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }), withCredentials: true,
  };
  loginurl = 'http://13.232.8.87:8082/api/session'
  constructor(private http: HttpClient) { }

  login(data) {
    let body = new URLSearchParams();
    body.set('email', data.email);
    body.set('password', data.password);
    this.Body = body;
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

    // this.http.delete(this.loginurl,this.loginhttpOptions).subscribe((res)=>{

    // })

    const logdelhttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    let promise = new Promise((resolve, reject) => {
      this.http.delete(this.loginurl, this.loginhttpOptions).subscribe((data) => {
        this.islloggedin = false;
        this.loginsub.next(this.islloggedin);
        this.clearUser();
        // if (data) {

        //   console.log('logout success data ', data)

        //   this.islloggedin = false;
        //   this.loginsub.next(this.islloggedin);
        //   this.clearUser();

        // }
        resolve(data);
      }, (error) => {
        console.log('logout error is ', error)

        reject(error);
      })

      return promise;
    });

    // this.islloggedin = false;
    // this.loginsub.next(this.islloggedin);
    // this.clearUser();
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

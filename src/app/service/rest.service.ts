import { Injectable, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonServiceService } from './../service/common-service.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

var headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/json');
headers_object.append("Authorization", "Basic" + "admin:admin");

const httpOptions = {
  withCredentials: true,
  headers: headers_object
};

// var apiurl:string;
// var deviceId :number;

@Injectable({
  providedIn: 'root'
})

export class RestService {
  
  constructor(private http: HttpClient, public CommonService:CommonServiceService) { }

  public get(url: string, data?: any, headers?: any): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.get(url, data).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    });
    return promise;
  }


  public delete(url: string, data?: any, headers?: any): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.delete(url, data).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    });
    return promise;
  }


  public add(url: string, data?: any, headers?: any): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.post(url, data).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        reject(error);
      })
    });
    return promise;
  }

  

}


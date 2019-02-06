import { Injectable, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonServiceService } from './../service/common-service.service';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + 'YWRtaW46YWRtaW4='
  })
};


@Injectable({
  providedIn: 'root'
})

export class RestService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + 'YWRtaW46YWRtaW4='
    })
  };



  constructor(private http: HttpClient, public CommonService: CommonServiceService) {

  }



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



  addDevice(url: string, device?: object, headers?: any) {
    let promise = new Promise((resolve, reject) => {
      this.http.post(url, device, headers).subscribe((device: object) => {
        resolve(device);
      }, (error) => {
        reject(error);
      })
    });
    return promise;
  }

  editDevice(url: string, device?: object, headers?: any) {
    let promise = new Promise((resolve, reject) => {
      this.http.put(url, device, headers).subscribe((device: object) => {
        resolve(device);
      }, (error) => {
        reject(error);
      })
    });
    return promise;
  }

  deleteDevice(url: string, headers?: any) {
    let promise = new Promise((resolve, reject) => {
      this.http.delete(url, headers).subscribe((device: object) => {
        resolve(device);
      }, (error) => {
        reject(error);
      })
    });
    return promise;
  }

  // deletetag(url: any, header: any, body: any) {


  //   return this.http.delete(url, new RequestOptions({ headers: header, body: body }));
  // }
  deleteDevicewithbody(url: string, body?: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + 'YWRtaW46YWRtaW4='
      }), body: body
    };
    let promise = new Promise((resolve, reject) => {
      this.http.delete(url, httpOptions).subscribe((device: object) => {
        resolve(device);
      }, (error) => {
        reject(error);
      })
    });
    return promise;
  }
  public putaccount(url: string, data?: any, headers?: any): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.put(url, data, this.httpOptions).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        reject(error);
        console.log('account put error', error);

      })
    });
    return promise;
  }

  commonpost(url: string, data?: any, headers?: any) {
    let promise = new Promise((resolve, reject) => {
      this.http.post(url, data, this.httpOptions).subscribe((res: object) => {
        resolve(res);
      }, (error) => {
        reject(error);
      })
    });
    return promise;
  }
  commonget(url: string,  headers?: any) {
    let promise = new Promise((resolve, reject) => {
      this.http.get(url, this.httpOptions).subscribe((res: object) => {
        resolve(res);
      }, (error) => {
        reject(error);
      })
    });
    return promise;
  }

  commonput(url: string, data?: any, headers?: any): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.put(url, data, this.httpOptions).subscribe((data: any) => {
        resolve(data);
      }, (error) => {
        reject(error);
        console.log('server put error', error);

      })
    });
    return promise;
  }



}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http:HttpClient) { }


  public post(url: string, data?: any, headers?: any): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.http.post(url, data).subscribe((data: any) => {
        resolve(data);
        
        console.log('login resolve' , data);
      }, (error) => {
        reject(error);
        console.log('login reject' , error);

      })
    });
    return promise;
  }
}

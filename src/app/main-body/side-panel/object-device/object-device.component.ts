import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonServiceService } from './../../../service/common-service.service';
import { RestService } from '../../../service/rest.service';

var headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/json');
headers_object.append("Authorization", "Basic" + "admin:admin");

const httpOptions = {
  withCredentials: true,
  headers: headers_object
};

var deviceId :number;
var apiurl:string = "";

@Component({
  selector: 'app-object-device',
  templateUrl: './object-device.component.html',
  styleUrls: ['./object-device.component.scss'],
})



export class ObjectDeviceComponent implements OnInit {
  
  constructor( private CommonService:CommonServiceService, private ajax:RestService ) { }

  mydata = this.CommonService.tempData;

  active:boolean = false;

  devices:object;

  
  deviceId:number = 1; 
  
  apiurl:string = "http://13.232.8.87:8082/api/positions?id=";

  apiurl2:string = "http://13.232.8.87:8082/api/devices";

  test:object;
  
  ngOnInit() {
    
      this.ajax.getDeviceDetails(this.apiurl, this.deviceId)
            
      
      
  }


    
  onClick(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    deviceId = target.attributes.id.value;
    //apiurl = "http://13.232.8.87:8082/api/positions?id=";
    this.ajax.getDeviceDetails(this.apiurl, deviceId);
  }








  
}

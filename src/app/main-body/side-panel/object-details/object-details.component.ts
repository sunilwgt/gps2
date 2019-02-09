import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonServiceService } from './../../../service/common-service.service';
import { RestService } from '../../../service/rest.service';
import { ObjectDetails } from './object-details.model';



var headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/json');
headers_object.append("Authorization", "Basic " + "YWRtaW46YWRtaW4=");

const httpOptions = {
  withCredentials: true,
  headers: headers_object
};




@Component({
  selector: 'app-object-details',
  templateUrl: './object-details.component.html',
  styleUrls: ['./object-details.component.scss'],
})
export class ObjectDetailsComponent implements OnInit {

  constructor(public CommonService: CommonServiceService, private ajax: RestService) { }

  deviceDetails: ObjectDetails;
  // deviceDetails;

  ngOnInit() {

    this.CommonService.deviceDetails.subscribe((value) => {
      this.deviceDetails = value;
      console.log ('subscribed device details value' , this.deviceDetails);
    })


    // this.CommonService.deviceNumber.subscribe((value)=>{
    //   //console.log(value);
    //   this.deviceID = value[0];
    // })

  }


  status: boolean = false;
  public showhide() {
    this.status = !this.status;
  }

}

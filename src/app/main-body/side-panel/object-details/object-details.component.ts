import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonServiceService } from './../../../service/common-service.service';
import { RestService } from '../../../service/rest.service';


@Component({
  selector: 'app-object-details',
  templateUrl: './object-details.component.html',
  styleUrls: ['./object-details.component.scss'],  
})
export class ObjectDetailsComponent implements OnInit {

  constructor( public CommonService:CommonServiceService, private ajax:RestService ) { }

  deviceID:object;
  
  ngOnInit() {

    this.CommonService.deviceNumber.subscribe((value)=>{
      //console.log(value);
      this.deviceID = value[0];
    })
    
  }


  




  status: boolean = false;
  public showhide(){
    this.status = !this.status;
  }

}

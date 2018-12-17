import { Component, OnInit, Input } from '@angular/core';
import { CommonServiceService } from '../../../service/common-service.service';




@Component({
  selector: 'app-object-details',
  templateUrl: './object-details.component.html',
  styleUrls: ['./object-details.component.scss'],  
})
export class ObjectDetailsComponent implements OnInit {

  constructor( public CommonService:CommonServiceService ) { }

  deviceID:number;
  
  ngOnInit() {
    this.CommonService.deviceNumber.subscribe((data)=>{
      console.log(data.value);
      this.deviceID=data.value;
    })

  }

  status: boolean = false;
  public showhide(){
    this.status = !this.status;
  }


}

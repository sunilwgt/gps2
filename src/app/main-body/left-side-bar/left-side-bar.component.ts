import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from './../../service/common-service.service';

@Component({
  selector: 'app-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss']
})
export class LeftSideBarComponent implements OnInit {

  constructor(public CommonService : CommonServiceService ) { }

  ngOnInit() {
  }
  
  //status: boolean = false;

  public changeClass() {
    console.log(this.CommonService.status);
    this.CommonService.status = !this.CommonService.status;
    //this.status = !this.status
  }

}

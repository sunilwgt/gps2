import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from './../../service/common-service.service';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';


@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {
  constructor( public CommonService : CommonServiceService ) { }

  ngOnInit() {        

  }

  mydata = this.CommonService.tempData;



  


}

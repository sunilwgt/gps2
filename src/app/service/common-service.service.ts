import { Injectable, OnInit, EventEmitter, Output } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})



export class CommonServiceService implements OnInit {
  status: boolean = false;
  tempData: any[];
  @Output() device = new EventEmitter<object>();
  @Output() deviceDetails = new EventEmitter<object>();
  @Output() deviceDetailsEdit = new EventEmitter<object>();

  //   tempData: any = [
  //     {
  //         'deviceid' : 1,
  //         'name': 'BMW M5',
  //         'date':'2018-12-11',
  //         'time':'12:13:55',
  //         'speed':'15 kph',
  //         'status':'Online',
  //     },
  //     {
  //         'deviceid' : 2,
  //         'name': 'BMW M6',
  //         'date':'2018-12-11',
  //         'time':'12:13:55',
  //         'speed':'15 kph',
  //         'status':'Ofline',      
  //   },
  //   {
  //         'deviceid' : 3,
  //         'name': 'BMW M7',
  //         'date':'2019-12-11',
  //         'time':'12:13:55',
  //         'speed':'15 kph',
  //         'status':'Ofline',      
  // }

  // ];

  //public tododata: any;
  constructor() {
    //this.tododata=null;
  }

  ngOnInit() {

  }

  deviceemit(value) {
    this.device.emit(value);
  }

  deviceDetailsemit(value) {
    this.deviceDetails.emit(value);
  }

}

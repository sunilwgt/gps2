import { Injectable, OnInit, EventEmitter, Output } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
//import 'rxjs/add/observable/of';


@Injectable({
  providedIn: 'root'
})



export class CommonServiceService implements OnInit {  
  status : boolean = false;
  @Output() deviceNumber = new EventEmitter<number>(); 
  
  
  tempData: any = [
    {
        'deviceid' : 1347,
        'name': 'BMW M5',
        'date':'2018-12-11',
        'time':'12:13:55',
        'speed':'15 kph',
        'status':'Online',
    },
    {
        'deviceid' : 1348,
        'name': 'BMW M6',
        'date':'2018-12-11',
        'time':'12:13:55',
        'speed':'15 kph',
        'status':'Ofline',      
  },
  {
        'deviceid' : 1349,
        'name': 'BMW M7',
        'date':'2019-12-11',
        'time':'12:13:55',
        'speed':'15 kph',
        'status':'Ofline',      
}
    
];
  constructor() { }

  ngOnInit() {

  }

  detaemit ( data){
    this.deviceNumber.emit(data); 
  }



}

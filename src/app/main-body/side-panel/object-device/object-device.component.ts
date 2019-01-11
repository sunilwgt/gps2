import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonServiceService } from './../../../service/common-service.service';
import { RestService } from '../../../service/rest.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SocketDataService } from '../../../socket-data.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

var headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/json');
headers_object.append("Authorization", "Basic " + "YWRtaW46YWRtaW4=");

const httpOptions = {
  withCredentials: true,
  headers: headers_object
};

var deviceId: number;
//var apiurl:string = "";

@Component({
  selector: 'app-object-device',
  templateUrl: './object-device.component.html',
  styleUrls: ['./object-device.component.scss'],
})

export class ObjectDeviceComponent implements OnInit {
  model: any = {};
  closeResult: string;
  deviceData: any;


  constructor(private CommonService: CommonServiceService, private ajax: RestService, private modalService: NgbModal, private wsService: SocketDataService) {
    this.deviceData = <Subject<any>>wsService
      .connect("ws://13.232.8.87:8082/api/socket")
      .pipe(map((response: MessageEvent): any => {
        // let data = JSON.parse(response.data);
        return response.data;
      }));
  }

  active: boolean = false;

  devices: object;


  apiurl1: string = "http://13.232.8.87:8082/api/devices";
  apiurl2: string = "http://13.232.8.87:8082/api/positions?deviceId=";
  apiurldelete: string = "http://13.232.8.87:8082/api/devices/";


  device: object;

  deviceId: number;
  deviceName: string


  open(content, deviceID, deviceName) {
    this.deviceId = deviceID;
    this.deviceName = deviceName;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public delete(closeModal) {
    //alert(this.apiurldelete);
    //alert(this.deviceId);     
    this.deleteDevice(this.apiurldelete, closeModal);
  }




  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {

    this.getDevice(this.apiurl1)

    this.CommonService.device.subscribe((value) => {
      this.device = value;
      // console.log(value);
      this.CommonService.tempData = value;
      if (value.length) {
        deviceId = value[0].id;
        //deviceId = 21;
        this.getDeviceDetails(this.apiurl2, deviceId);
      }
    })

    this.deviceData.subscribe((val) => {
      let currentData = JSON.parse(val);
      if ("devices" in currentData) {
        let curDeviceData = currentData.devices;
        this.CommonService.tempData.map((data, index) => {
          for (let cDD of curDeviceData) {
            if (data.id == cDD.id) {
              this.CommonService.tempData[index] = cDD;
            }
          }

        });
        // console.log(this.CommonService.tempData);
        this.CommonService.deviceemit(this.CommonService.tempData);
      }

    })
  }


  getDevice(apiurl, headerconst?) {
    this.ajax.get(apiurl, httpOptions).then((value) => {
      this.CommonService.deviceemit(value)
    }).catch(() => {
      console.log('error happened');
    });
  }




  onClick(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    deviceId = target.attributes.id.value;
    this.getDeviceDetails(this.apiurl2, deviceId);
  }

  getDeviceDetails(apiurl, headerconst?) {
    this.ajax.get(apiurl + deviceId, httpOptions).then((value) => {
      this.CommonService.deviceDetailsemit(value)
      //console.log(this.device);
    }).catch(() => {
      console.log('error happened');
    });
  }



  deleteDevice(apiurl, closeModal) {
    this.ajax.delete(apiurl + this.deviceId, httpOptions).then((value) => {
      closeModal.click();
      this.getDevice(this.apiurl1);
    }).catch(() => {
      console.log('error happened');
    });
  }

  editDevice(data) {
    this.CommonService.deviceDetailsEdit.emit(data);
  }



}

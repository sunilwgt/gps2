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

// const httpOptions = {
//   withCredentials: true,
//   headers: headers_object
// };
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + 'YWRtaW46YWRtaW4='
  })
};
// var deviceId: number;
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
  apiurlGetDrivers: string = "http://13.232.8.87:8082/api/drivers";
  apiUrlDriverDevice: string = "http://13.232.8.87:8082/api/drivers?deviceId";
  apiDriverAssign: string = "http://13.232.8.87:8082/api/permissions";
  apiurlGetNotify: string = "http://13.232.8.87:8082/api/notifications";
  apiurlNotifyDevice: string = "http://13.232.8.87:8082/api/notifications?deviceId";
  apiurlGetCompAttribute: string = "http://13.232.8.87:8082/api/attributes/computed";
  apiurlCompAttrDevice: string = "http://13.232.8.87:8082/api/attributes/computed?deviceId";

  device: object;

  deviceId: number;
  deviceName: string;
  drivers: any = [];
  driversSelected: any = [];
  response: boolean = false;
  notifys: any = [];
  compAttributes: any = [];


  open(content) {

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  DeleteDevice(content, deviceID, deviceName) {
    this.deviceId = deviceID;
    this.deviceName = deviceName;
    this.open(content);
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
      this.CommonService.tempData = value;
      if (value.length) {
        // this.deviceId = value[0].id;
        //deviceId = 21;
        this.getDeviceDetails(this.apiurl2, value[0].id);
      }
    })

    this.deviceData.subscribe((val) => {
      let currentData = JSON.parse(val);
      // console.log(currentData);
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

      if ("positions" in currentData && this.deviceId) {
        let curDeviceData = currentData.positions;
        this.CommonService.tempData.map((data, index) => {
          // console.log(data);

          for (let cDD of curDeviceData) {
            if (data.id == cDD.deviceId) {
              if (data.id == this.deviceId) {
                // console.log(cDD);
                this.CommonService.deviceDetailsemit(cDD)
              }
            }
          }

        });
      }

    });

    this.ajax.get(this.apiurlGetDrivers, httpOptions).then((data) => {
      this.drivers = data;
    }).catch(error => {
      console.error(error);
    });

    this.ajax.get(this.apiurlGetNotify, httpOptions).then((data) => {
      this.notifys = data;
    }).catch(error => {
      console.error(error);
    });

    this.ajax.get(this.apiurlGetCompAttribute, httpOptions).then((data) => {
      this.compAttributes = data;
    }).catch(error => {
      console.error(error);
    });
  }


  getDevice(apiurl, headerconst?) {
    this.ajax.get(apiurl, httpOptions).then((value) => {
      this.CommonService.deviceemit(value)
    }).catch(() => {
      console.log('error happened');
    });
  }




  onClick(id) {
    // var target = event.target || event.srcElement || event.currentTarget;
    this.deviceId = id;
    this.getDeviceDetails(this.apiurl2, this.deviceId);
  }

  getDeviceDetails(apiurl, id) {
    this.ajax.get(apiurl + id, httpOptions).then((value) => {
      value.map((dat) => {
        this.CommonService.deviceDetailsemit(dat)
      })

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

  assignDriver(id: number, modal: any) {
    let ids = [];
    this.deviceId = id;
    this.ajax.get(this.apiUrlDriverDevice + "=" + id, httpOptions).then((driv) => {
      driv.map((val) => {
        let i = val['id'];
        ids.push(i);

      });
      this.drivers.map((value, index) => {
        if (ids.indexOf(value.id) != -1) {
          this.drivers[index].selected = true;
        } else {
          this.drivers[index].selected = false;
        }
      });
      this.open(modal);
    });




  }

  onChangeDriver(event, i) {
    let data = {
      deviceId: this.deviceId,
      driverId: i
    };
    this.response = true;
    if (event.target.checked) {
      this.ajax.addDevice(this.apiDriverAssign, data, httpOptions).then((data) => {
        this.response = false;
      }).catch(() => {
        this.response = false;
        console.log('error happened');
      });
    } else {
      this.ajax.deleteDevicewithbody(this.apiDriverAssign, data).then((data) => {
        this.response = false;
      }).catch(() => {
        this.response = false;
        console.log('error happened');
      });
    }

  }

  assignNotify(id: number, modal: any) {
    let ids = [];
    this.deviceId = id;
    this.ajax.get(this.apiurlNotifyDevice + "=" + id, httpOptions).then((not) => {
      not.map((val) => {
        let i = val['id'];
        ids.push(i);

      });
      this.notifys.map((value, index) => {
        if (ids.indexOf(value.id) != -1) {
          this.notifys[index].selected = true;
        } else {
          this.notifys[index].selected = false;
        }
      });
      this.open(modal);
    });




  }

  onChangeNotify(event, i) {
    let data = {
      deviceId: this.deviceId,
      notificationId: i
    };
    this.response = true;
    if (event.target.checked) {
      this.ajax.addDevice(this.apiDriverAssign, data, httpOptions).then((data) => {
        this.response = false;
      }).catch(() => {
        this.response = false;
        console.log('error happened');
      });
    } else {
      this.ajax.deleteDevicewithbody(this.apiDriverAssign, data).then((data) => {
        this.response = false;
      }).catch(() => {
        this.response = false;
        console.log('error happened');
      });
    }

  }

  assigncompAttribute(id: number, modal: any) {
    let ids = [];
    this.deviceId = id;
    this.ajax.get(this.apiurlCompAttrDevice + "=" + id, httpOptions).then((not) => {
      not.map((val) => {
        let i = val['id'];
        ids.push(i);

      });
      this.compAttributes.map((value, index) => {
        if (ids.indexOf(value.id) != -1) {
          this.compAttributes[index].selected = true;
        } else {
          this.compAttributes[index].selected = false;
        }
      });
      this.open(modal);
    });




  }

  onChangecompAttribute(event, i) {
    let data = {
      deviceId: this.deviceId,
      attributeId: i
    };
    this.response = true;
    if (event.target.checked) {
      this.ajax.addDevice(this.apiDriverAssign, data, httpOptions).then((data) => {
        this.response = false;
      }).catch(() => {
        this.response = false;
        console.log('error happened');
      });
    } else {
      this.ajax.deleteDevicewithbody(this.apiDriverAssign, data).then((data) => {
        this.response = false;
      }).catch(() => {
        this.response = false;
        console.log('error happened');
      });
    }

  }



}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CommonServiceService } from './../../../service/common-service.service';
import { RestService } from '../../../service/rest.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SocketDataService } from '../../../socket-data.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { element } from '@angular/core/src/render3';

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
  commandstype = [{ name: 'Custom', value: 'Custom Command' }];
  commands = []
  command;
  newcommand = false;
  sendnewcommandtype;
  sendnewcommanddata;
  filteredelement = [];
  filteredelementdescription;
  filteredelementtextchannel;
  filteredelementtype;
  filteredelementdata;
  textchannel;
  dataselected = false;
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

  apiurlGetMaintainance: string = "http://13.232.8.87:8082/api/maintenances";
  apiurlGetMaintainancedevice: string = "http://13.232.8.87:8082/api/maintenances?deviceId";
  apiurlMaintainanceassign: string = "http://13.232.8.87:8082/api/maintenances";

  apiurlGetsavedcommands: string = "http://13.232.8.87:8082/api/commands";
  apiurlGetsavedcommandsdevice: string = "http://13.232.8.87:8082/api/commands?deviceId";
  apiurlsavedcommandassign: string = "http://13.232.8.87:8082/api/commands";

  apiurlGetgeofences: string = "http://13.232.8.87:8082/api/geofences";
  apiurlGetgeofencedevice: string = "http://13.232.8.87:8082/api/geofences?deviceId";
  apiurlgeofenceassign: string = "http://13.232.8.87:8082/api/geofences";

  apiurlGetcommandsdevice: string = "http://13.232.8.87:8082/api/commands/send?deviceId";
  apiurlsendcommand: string = "http://13.232.8.87:8082/api/commands/send";


  device: object;

  deviceId: number;
  deviceName: string;
  drivers: any = [];
  maintenance: any = [];
  savedcommands: any = [];
  geofences: any = [];
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

    this.ajax.get(this.apiurlGetMaintainance, httpOptions).then((data) => {
      this.maintenance = data;
    }).catch(error => {
      console.error(error);
    });

    this.ajax.get(this.apiurlGetsavedcommands, httpOptions).then((data) => {
      this.savedcommands = data;
    }).catch(error => {
      console.error(error);
    });

    this.ajax.get(this.apiurlGetgeofences, httpOptions).then((data) => {
      this.geofences = data;
    }).catch(error => {
      console.error(error);
    });

  }


  getDevice(apiurl, headerconst?) {
    console.log('getdevice url ' , apiurl);
    console.log('httpOptions ' , httpOptions);
    this.ajax.get(apiurl, httpOptions).then((value) => {
    console.log('getdevice data ' , value);
      this.CommonService.deviceemit(value)
    }).catch((error) => {
      console.log('error happened' , error);
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

  assignmaintenance(id: number, modal: any) {
    let ids = [];
    this.deviceId = id;
    this.ajax.get(this.apiurlGetMaintainancedevice + "=" + id, httpOptions).then((not) => {
      not.map((val) => {
        let i = val['id'];
        ids.push(i);
      });
      this.maintenance.map((value, index) => {
        if (ids.indexOf(value.id) != -1) {
          this.maintenance[index].selected = true;
        } else {
          this.maintenance[index].selected = false;
        }
      });
      this.open(modal);
    });
  }

  onChangemaintenance(event, i) {
    let data = {
      deviceId: this.deviceId,
      maintenanceid: i
    };
    this.response = true;
    if (event.target.checked) {
      this.ajax.addDevice(this.apiDriverAssign, data, httpOptions).then((data) => {
        console.log('data1', data);
        this.response = false;
      }).catch((error) => {
        this.response = false;
        console.log('error happened1', error);
      });
    } else {
      this.ajax.deleteDevicewithbody(this.apiDriverAssign, data).then((data) => {
        this.response = false;
      }).catch((error) => {
        this.response = false;
        console.log('error happened2', error);
      });
    }

  }

  assignsavedcommands(id: number, modal: any) {
    let ids = [];
    this.deviceId = id;
    this.ajax.get(this.apiurlGetsavedcommandsdevice + "=" + id, httpOptions).then((not) => {
      console.log('ssaved commands device ', not);
      not.map((val) => {
        let i = val['id'];
        ids.push(i);
      });
      this.savedcommands.map((value, index) => {
        if (ids.indexOf(value.id) != -1) {
          this.savedcommands[index].selected = true;
        } else {
          this.savedcommands[index].selected = false;
        }
      });
      this.open(modal);
    });
  }

  onChangesavedcommands(event, i) {
    let data = {
      deviceId: this.deviceId,
      commandId: i
    };
    this.response = true;
    if (event.target.checked) {
      this.ajax.addDevice(this.apiDriverAssign, data, httpOptions).then((data) => {
        this.response = false;
      }).catch((error) => {
        this.response = false;
      });
    } else {
      this.ajax.deleteDevicewithbody(this.apiDriverAssign, data).then((data) => {
        this.response = false;
      }).catch((error) => {
        this.response = false;
        console.log('error happened2', error);
      });
    }
  }

  assigngeofence(id: number, modal: any) {
    let ids = [];
    this.deviceId = id;
    this.ajax.get(this.apiurlGetgeofencedevice + "=" + id, httpOptions).then((not) => {
      not.map((val) => {
        let i = val['id'];
        ids.push(i);
      });
      this.geofences.map((value, index) => {
        if (ids.indexOf(value.id) != -1) {
          this.geofences[index].selected = true;
        } else {
          this.geofences[index].selected = false;
        }
      });
      this.open(modal);
    });
  }

  onChangegeofence(event, i) {
    let data = {
      deviceId: this.deviceId,
      geofenceId: i
    };
    this.response = true;
    if (event.target.checked) {
      this.ajax.addDevice(this.apiDriverAssign, data, httpOptions).then((data) => {
        this.response = false;
      }).catch((error) => {
        this.response = false;
      });
    } else {
      this.ajax.deleteDevicewithbody(this.apiDriverAssign, data).then((data) => {
        this.response = false;
      }).catch((error) => {
        this.response = false;
        console.log('error happened2', error);
      });
    }
  }



  assignsendcommand(id: number, modal: any) {
    this.commands.splice(0, this.commands.length);
    let ids = [];
    this.deviceId = id;
    this.ajax.get(this.apiurlGetcommandsdevice + "=" + id, httpOptions).then((not) => {
      this.commands[0] = [{ description: 'New...' }];
      this.commands.push(not)
      this.open(modal);
    });
  }

  selectcommand(e, data) {
    if (this.command === 'New...') {
      this.newcommand = true;
      this.commands.filter((element) => {
        if (element[0].description == data) {
          this.filteredelement = element;
        }
      })
    }
    else {
      this.newcommand = false;
      this.commands.filter((element) => {
        if (element[0].description == data) {
          this.filteredelement = element;
          this.filteredelementtextchannel = this.filteredelement[0].textChannel;
          this.filteredelementtype = this.filteredelement[0].type;
          this.filteredelementdata = this.filteredelement[0].attributes.data;
        }
      })
    }
  }

  settype(e) {
    if (e === 'Custom Command') {
      this.dataselected = true;
    }
  }

  sendcommand() {
    this.ajax.addDevice(this.apiurlsendcommand, this.filteredelement[0], httpOptions).then((data) => {
    }).catch((error) => {
      console.log('error happened', error);
    });

  }
  sendnewcommand() {
    const d = { data: this.sendnewcommanddata }
    const fulldata = { description: 'New...', attributes: d, deviceId: this.deviceId, textChannel: this.textchannel, type: 'custom' };
    this.ajax.addDevice(this.apiurlsendcommand, fulldata, httpOptions).then((data) => {
    }).catch((error) => {
      console.log('error happened', error);
    });
  }

  assignaccumulator(id: number, modal: any) {
  //   let ids = [];
  //   this.deviceId = id;
  //   const devicedata = new Array(this.device);
  //  devicedata.filter((ele)=>{ele.filter((e)=>{
  //    console.log
  //  })})
  // console.log('devicedata' , devicedata);
  

  //   this.open(modal);
  }

}

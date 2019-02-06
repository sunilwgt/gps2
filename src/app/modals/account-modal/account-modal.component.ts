import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../service/rest.service';
import { HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/Authentication/authentication.service';
import { MainBodyComponent } from 'src/app/main-body/main-body.component';
import { MainserviceService } from 'src/app/main-body/mainservice.service';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
var headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/json');
headers_object.append("Authorization", "Basic" + "admin:admin");

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

@Component({
  selector: 'app-account-modal',
  templateUrl: './account-modal.component.html',
  styleUrls: ['./account-modal.component.scss']
})
export class AccountModalComponent implements OnInit {
  private config: MatSnackBarConfig;
  public isCollapsedpreferences = true;
  public isCollapsedPermissions = true;
  userid;
  user;
  accountmodel = false;
  maps: any = [{
    key: 'carto'
  }, {
    key: 'osm'
  }, {
    key: 'bingRoad'
  }, {
    key: 'bingAerial'
  }, {
    key: 'bingHybrid'
  }, {
    key: 'baidu'
  }, {
    key: 'yandexMap'
  }, {
    key: 'yandexSat'
  }, {
    key: 'wikimedia'
  }, {
    key: 'custom'
  }];

  coordinate: any = [{
    key: 'dd',
    value: "Decimal Degree"
  }, {
    key: 'ddm',
    value: "Decimal Degree Minute"
  }, {
    key: 'dms',
    value: "Decimal Minute Second"
  }];

  attrNames: any = [{
    key: 'mail.smtp.host',
    valueType: 'string'
  }, {
    key: 'mail.smtp.port',
    valueType: 'number',
    allowDecimals: false,
    minValue: 1,
    maxValue: 65535
  }, {
    key: 'mail.smtp.starttls.enable',
    valueType: 'boolean'
  }, {
    key: 'mail.smtp.starttls.required',
    valueType: 'boolean'
  }, {
    key: 'mail.smtp.ssl.enable',
    valueType: 'boolean'
  }, {
    key: 'mail.smtp.ssl.trust',
    valueType: 'string'
  }, {
    key: 'mail.smtp.ssl.protocols',
    valueType: 'string'
  }, {
    key: 'mail.smtp.from',
    valueType: 'string'
  }, {
    key: 'mail.smtp.auth',
    valueType: 'boolean'
  }, {
    key: 'mail.smtp.username',
    valueType: 'string'
  }, {
    key: 'mail.smtp.password',
    valueType: 'string'
  }, {
    key: 'web.liveRouteLength',
    valueType: 'number',
    allowDecimals: false
  }, {
    key: 'web.selectZoom',
    valueType: 'number',
    allowDecimals: false
  }, {
    key: 'web.maxZoom',
    valueType: 'number',
    allowDecimals: false
  }, {
    key: 'ui.disableReport',
    valueType: 'boolean'
  }, {
    key: 'ui.disableEvents',
    valueType: 'boolean'
  }, {
    key: 'ui.disableVehicleFetures',
    valueType: 'boolean'
  }, {
    key: 'ui.disableDrivers',
    valueType: 'boolean'
  }, {
    key: 'ui.disableComputedAttributes',
    valueType: 'boolean'
  }, {
    key: 'ui.disableCalendars',
    valueType: 'boolean'
  }, {
    key: 'ui.disableMaintenances',
    valueType: 'boolean'
  }, {
    key: 'ui.hidePositionAttributes',
    valueType: 'string'
  }, {
    key: 'distanceUnit',
    valueType: 'string',
    dataType: 'distanceUnit'
  }, {
    key: 'speedUnit',
    valueType: 'string',
    dataType: 'speedUnit'
  }, {
    key: 'volumeUnit',
    valueType: 'string',
    dataType: 'volumeUnit'
  }, {
    key: 'timezone',
    valueType: 'string',
    dataType: 'timezone'
  }];

  distanceUnit: any = [{
    key: 'km',
    factor: 0.001
  }, {
    key: 'mi',
    factor: 0.000621371
  }, {
    key: 'nmi',
    factor: 0.000539957
  }];

  speedUnit: any = [{
    key: 'kn',
    factor: 1
  }, {
    key: 'kmh',
    factor: 1.852
  }, {
    key: 'mph',
    factor: 1.15078
  }];

  timeUnit: any = [{
    key: 's',
    factor: 1
  }, {
    key: 'm',
    factor: 60
  }, {
    key: 'h',
    factor: 3600
  }];

  volumeUnit: any = [{
    key: 'ltr',
    factor: 1
  }, {
    key: 'impGal',
    factor: 4.546
  }, {
    key: 'usGal',
    factor: 3.785
  }];


  MapLayer: any = [{
    key: 'carto',
    value: 'Carto BaseMaps'
  }, {
    key: 'osm',
    value: 'Open Street Map'
  }, {
    key: 'bingRoad',
    value: 'Bing Maps Road '
  }, {
    key: 'bingAerial',
    value: 'Map Bing Aerial'
  }, {
    key: 'bingHybrid',
    value: 'Map Bing Hybrid'
  }, {
    key: 'baidu',
    value: 'Map Baidu'
  }, {
    key: 'yandexMap',
    value: 'Map Yandex Map'
  }, {
    key: 'yandexSat',
    value: 'Map Yandex Set'
  }, {
    key: 'wikimedia',
    value: 'Map Wikimedia'
  }, {
    key: 'custom',
    value: 'Map Custom'

  }

  ]



  cordinatesformat: any = [{
    key: 'dd',
    value: ' Shared Decimal Degrees'
  }, {
    key: 'ddm',
    value: 'Shared Degrees Decimal Minutes'
  }, {
    key: 'dms',
    value: 'Shared Degrees Minute Seconds'
  }]




  closeResult: any;
  userEdit: any = {};
  apiurlGetusers: string = "http://13.232.8.87:8082/api/users/";
  apiurlPutuser: string = "http://13.232.8.87:8082/api/users/";
  @ViewChild('userModal') userModal: ElementRef;
  users: any;
  mlayer: any;
  coformat: any;
  userIndex: string = '';
  attributes: any = {};
  attributeEdit: any = {};
  attributeIndex: string = ''
  comingattributes = {};
  attributeNameSelected: string = '';
  optionApi: string = "http://13.232.8.87:8082/api/";
  optionChangeApi: string = "http://13.232.8.87:8082/api/permissions";
  testnoteapi: string = "http://13.232.8.87:8082/api/notifications/test";
  optionArr: any = [];
  optionSelected: string = '';
  response: boolean = false;
  userId: string = ''
  timeformat: boolean;


  constructor(private modalService: NgbModal, private ajax: RestService,
    private mainservice: MainserviceService,
    private authservice: AuthenticationService,
    private snackbar: MatSnackBar
  ) {
    // let config = new MatSnackBarConfig();
    // config.verticalPosition = this.verticalPosition;
    // config.horizontalPosition = this.horizontalPosition;
    // config.duration = this.setAutoHide ? this.autoHide : 0;
    // this.user = this.authservice.getUser();
    // console.log('users data', this.user)
    // this.mlayer = this.user.map;
    // this.coformat = this.user.coordinateFormat;
    // this.comingattributes = this.user.attributes;
    // console.log('comingdata', this.comingattributes)
  }

  ngOnInit() {
    this.user = this.authservice.getUser();
    this.mlayer = this.user.map;
    this.coformat = this.user.coordinateFormat;
    this.comingattributes = this.user.attributes;

  }

  submitaccountdata() {
    const a = document.getElementById('usermodelclose');
    this.user.map = this.mlayer
    this.user.coordinateFormat = this.coformat
    this.ajax.putaccount(this.apiurlGetusers + this.user.id, this.user).then((data) => {
      this.snackbar.open('Account data updated successfully', 'Close', { duration: 3000 });

      this.users = data;
      this.user = data;
      this.coformat = data.coordinateFormat;
      this.mlayer = data.map;
      this.authservice.setUser(data);
      this.timeformat = this.users.twelveHourFormat;
      // document.getElementById('usermodelclose').click();
      this.closeaccountmodlel();

      // closeModal.click();
      // this.attributes = {};
      // this.userIndex = '';
    }).catch(error => {
      this.snackbar.open(error.error, 'Close', { duration: 3000 });
    });
  }
  getmapstate() {
    this.mainservice.getmapcenterandzoom().then((res) => {
      this.user.latitude = res.co[0]
      this.user.longitude = res.co[1]
      this.user.zoom = res.zoom
      this.snackbar.open(' Map  State Fetched  successfully , Submit To update it', 'Close', { duration: 3000 });
    }, error => {
      this.snackbar.open(error.error, 'Close', { duration: 3000 });

    })
  }
  sendnotifications() {
    this.ajax.commonpost(this.testnoteapi).then((res) => {
      this.snackbar.open('Test Notification Send', 'Close', { duration: 3000 });

    }, error => {
      this.snackbar.open(error.error, 'Close', { duration: 3000 });
    })

  }

  async  getusers() {
    await this.ajax.get(this.apiurlGetusers, httpOptions).then((data) => {
      this.users = data;
      this.timeformat = this.users.twelveHourFormat;
      // this.attributes = {};
      // this.userIndex = '';
    }).catch(error => {
      console.error(error);
    });
  }

  userSelected(i: string) {
    this.userIndex = i;
    this.userId = this.users[i].id;
    this.attributes = this.users[i].attributes;
  }

  getArray() {
    if (this.attributeNameSelected === 'distanceUnit') {
      return this.distanceUnit;
    }
    if (this.attributeNameSelected === 'speedUnit') {
      return this.speedUnit;
    }
    if (this.attributeNameSelected === 'volumeUnit') {
      return this.volumeUnit;
    }
    if (this.attributeNameSelected === 'timezone') {
      return this.timeUnit;
    }
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', backdrop: false, backdropClass: 'MainBodyComponent' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  generateToken() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    this.userEdit['token'] = text;
  }

  // openModal(modal) {
  //   console.log('open model ' , modal);
  //   this.userEdit = {};
  //   this.userIndex = '';
  //   this.userId = '';
  //   this.open(modal);
  // }
  openModal() {
    this.accountmodel = true;
  }

  closeaccountmodlel() {
    this.accountmodel = false;
  }
  getKeys(arr) {
    return Object.keys(arr);
  }

  Add(modal) {
    this.userIndex = '';
    this.userId = '';
    this.userEdit = {};
    this.attributes = {};
    this.open(modal);
  }

  edit(modal) {
    // this.userEdit['name'] = this.userIndex;
    this.userEdit = this.users[this.userIndex];
    this.open(modal);
  }

  delete() {
    this.userEdit = this.users[this.userIndex];
    this.ajax.deleteDevice(this.apiurlGetusers + '/' + this.userEdit.id, httpOptions).then((value) => {

      this.getusers();
    }).catch(() => {
    });
  }

  AddAttributeSubmit(formdata: NgForm, closeModal: any) {
    this.comingattributes[formdata.value.name] = formdata.value.value;
    this.user.attributes = this.comingattributes;

    this.user.map = this.mlayer
    this.user.coordinateFormat = this.coformat
    this.ajax.putaccount(this.apiurlGetusers + this.user.id, this.user).then((data) => {
      this.snackbar.open('Attribute added  successfully', 'Close', { duration: 3000 });
      this.users = data;
      this.user = data;
      this.coformat = data.coordinateFormat;
      this.mlayer = data.map;
      this.comingattributes = data.attributes;
      this.authservice.setUser(data);
      this.timeformat = this.users.twelveHourFormat;
      formdata.reset();
      closeModal.click();
      closeModal.click();
      // this.attributes = {};
      // this.userIndex = '';
    }).catch(error => {
      console.error(error);
      this.snackbar.open(error.error, 'Close', { duration: 3000 });

    });
  }

  editAttr(modal) {
    this.attributeEdit['name'] = this.attributeIndex;
    this.attributeEdit['value'] = this.attributes[this.attributeIndex];
    this.open(modal);
  }

  deleteAttr(modal) {
    delete this.comingattributes[this.attributeIndex];
    this.user.attributes = this.comingattributes;
    console.log('comingattributes', this.comingattributes)
    console.log('before sending user data ', this.user);
    this.user.map = this.mlayer
    this.user.coordinateFormat = this.coformat
    this.ajax.putaccount(this.apiurlGetusers + this.user.id, this.user).then((data) => {
      console.log('before sending user data ', data);
      this.snackbar.open('Attribute deleted successfully', 'Close', { duration: 3000 });

      this.users = data;
      this.user = data;
      this.coformat = data.coordinateFormat;
      this.mlayer = data.map;
      this.comingattributes = data.attributes;
      this.authservice.setUser(data);
      this.timeformat = this.users.twelveHourFormat;
      // this.attributes = {};
      // this.userIndex = '';
    }).catch(error => {
      console.error(error);
      this.snackbar.open(error.error, 'Close', { duration: 3000 });

    });


  }

  AddAttr(modal) {
    this.attributeIndex = '';
    this.open(modal);
  }

  onAttrNameChange(val) {
    this.attributeEdit.value = ''
    this.attributeNameSelected = val;
  }

  loadOther(option, modal) {
    let url = this.optionApi + option + "?all=true"
    let optionUrl = this.optionApi + option + "?userId=" + this.userId;
    let ids = [];
    this.optionSelected = option;
    this.ajax.get(url, httpOptions).then((data) => {
      this.optionArr = data;
      this.ajax.get(optionUrl, httpOptions).then((optionData) => {

        optionData.map((val) => {
          let i = val['id'];
          ids.push(i);

        });
        this.optionArr.map((value, index) => {
          if (ids.indexOf(value.id) != -1) {
            this.optionArr[index].selected = true;
          } else {
            this.optionArr[index].selected = false;
          }
        });
        this.open(modal);
      });
    });

  }

  onChangeOption(event, i) {
    let data = {};
    let idName = this.optionSelected.substring(0, this.optionSelected.length - 1) + "Id";
    data['userId'] = this.userId;
    if (this.optionSelected == 'attributes/computed') {
      data["attributeId"] = i;
    } else {
      data[idName] = i;
    }

    this.response = true;
    if (event.target.checked) {
      this.ajax.addDevice(this.optionChangeApi, data, httpOptions).then((data) => {
        this.response = false;
      }).catch(() => {
        this.response = false;
        console.log('error happened');
      });
    } else {
      this.ajax.deleteDevicewithbody(this.optionChangeApi, data).then((data) => {
        this.response = false;
      }).catch(() => {
        this.response = false;
        console.log('error happened');
      });
    }
  }




}

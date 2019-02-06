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
  selector: 'app-server-modal',
  templateUrl: './server-modal.component.html',
  styleUrls: ['./server-modal.component.scss']
})
export class ServerModalComponent implements OnInit {
  private config: MatSnackBarConfig;
  public isCollapsedpreferences = false;
  public isCollapsedPermissions = true;
  userid;
  user;
  serverModal = false;

  // maps: any = [{
  //   key: 'carto'
  // }, {
  //   key: 'osm'
  // }, {
  //   key: 'bingRoad'
  // }, {
  //   key: 'bingAerial'
  // }, {
  //   key: 'bingHybrid'
  // }, {
  //   key: 'baidu'
  // }, {
  //   key: 'yandexMap'
  // }, {
  //   key: 'yandexSat'
  // }, {
  //   key: 'wikimedia'
  // }, {
  //   key: 'custom'
  // }];

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
  maplayer: any;
  coordformat: any;
  userIndex: string = '';
  attributes: any = {};
  attributeEdit: any = {};
  attributeIndex: string = ''
  comingattributes = {};
  attributeNameSelected: string = '';
  optionApi: string = "http://13.232.8.87:8082/api/";
  optionChangeApi: string = "http://13.232.8.87:8082/api/permissions";
  testnoteapi: string = "http://13.232.8.87:8082/api/notifications/test";
  apiurlserver: string = "http://13.232.8.87:8082/api/server";

  optionArr: any = [];
  optionSelected: string = '';
  response: boolean = false;
  userId: string = ''
  timeformat: boolean;
  server;


  constructor(private modalService: NgbModal, private ajax: RestService,
    private mainservice: MainserviceService,
    private authservice: AuthenticationService,
    private snackbar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.getserverdata();

  }

  getserverdata() {
    this.ajax.commonget(this.apiurlserver).then((res) => {
      this.server = res;
      this.maplayer = this.server.map;
      this.coordformat = this.server.coordinateFormat;
      this.comingattributes = this.server.attributes;
    } , error =>{
      console.log(error);
    })
  }
  
 
  submitserverdata() {
    this.server.map = this.maplayer;
    this.server.coordinateFormat = this.coordformat;
    this.ajax.commonput(this.apiurlserver , this.server).then((res)=>{
      this.snackbar.open(' Server settings updated successfully', 'Close', { duration: 3000 });
    } , error => {
      console.log(error);
      this.snackbar.open(error.error, 'Close', { duration: 3000 });

    })
  }


  getmapstate() {
    this.mainservice.getmapcenterandzoom().then((res) => {
      this.server.latitude = res.co[0]
      this.server.longitude = res.co[1]
      this.server.zoom = res.zoom
      this.snackbar.open(' Map  State Fetched  successfully , Submit To update it', 'Close', { duration: 3000 });

    } , error =>{
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
    this.serverModal = true;
  }

  closeservermodal() {
    this.serverModal = false;
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
}

import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../service/rest.service';
import { HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

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
@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss']
})
export class UserModalComponent implements OnInit {

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

  closeResult: any;
  userEdit: any = {};
  apiurlGetusers: string = "http://13.232.8.87:8082/api/users";
  users: any;
  userIndex: string = '';
  attributes: any = {};
  attributeEdit: any = {};
  attributeIndex: string = ''
  attributeNameSelected: string = '';
  optionApi: string = "http://13.232.8.87:8082/api/";
  optionChangeApi: string = "http://13.232.8.87:8082/api/permissions";
  optionArr: any = [];
  optionSelected: string = '';
  response: boolean = false;
  userId: string = ''

  constructor(private modalService: NgbModal, private ajax: RestService) { }

  ngOnInit() {
    this.getusers();
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

  getusers() {
    this.ajax.get(this.apiurlGetusers, httpOptions).then((data) => {
      this.users = data;
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

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  AdduserSubmit(formdata, modal) {
    // this.users.push(formdata.value);

    let driv = {
      administrator: formdata.value.administrator ? true : false,
      attributes: this.attributes,
      coordinateFormat: formdata.value.coordinateFormat,
      deviceLimit: formdata.value.deviceLimit,
      deviceReadonly: formdata.value.deviceReadonly ? true : false,
      disabled: formdata.value.disabled ? true : false,
      email: formdata.value.email,
      expirationTime: formdata.value.expirationTime,
      latitude: formdata.value.latitude,
      limitCommands: formdata.value.limitCommands ? true : false,
      login: formdata.value.login,
      longitude: formdata.value.longitude,
      map: formdata.value.map,
      name: formdata.value.name,
      password: formdata.value.password,
      phone: formdata.value.phone,
      poiLayer: formdata.value.poiLayer,
      readonly: formdata.value.readonly ? true : false,
      token: this.userEdit.hasOwnProperty('token') ? this.userEdit.token : undefined,
      twelveHourFormat: formdata.value.twelveHourFormat ? true : false,
      userLimit: formdata.value.userLimit,
      zoom: formdata.value.zoom


    }
    if (this.userIndex) {
      driv['id'] = this.userEdit.id;
      this.ajax.editDevice(this.apiurlGetusers + '/' + this.userEdit.id, driv, httpOptions).then((value) => {
        formdata.reset();
        modal.click();
        this.getusers();
      }).catch(() => {
        console.log('error happened');
      });
    } else {
      this.ajax.addDevice(this.apiurlGetusers, driv, httpOptions).then((value) => {
        formdata.reset();
        modal.click();
        this.getusers();
      }).catch(() => {
        console.log('error happened');
      });
    }


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

  openModal(modal) {
    this.userEdit = {};
    this.userIndex = '';
    this.userId = '';
    this.open(modal);
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
      console.log('error happened');
    });
  }

  AddAttributeSubmit(formdata: NgForm, closeModal: any) {
    this.attributes[formdata.value.name] = formdata.value.value;

    formdata.reset();
    closeModal.click();
  }

  editAttr(modal) {
    this.attributeEdit['name'] = this.attributeIndex;
    this.attributeEdit['value'] = this.attributes[this.attributeIndex];
    this.open(modal);
  }

  deleteAttr(modal) {
    delete this.attributes[this.attributeIndex];
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

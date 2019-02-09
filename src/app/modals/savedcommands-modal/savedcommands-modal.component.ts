import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../service/rest.service';
import { HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

var headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/json');
headers_object.append("Authorization", "Basic" + "admin:admin");

const httpOptions = {
  withCredentials: true,
  headers: headers_object
};


@Component({
  selector: 'app-savedcommands',
  templateUrl: './savedcommands-modal.component.html',
  styleUrls: ['./savedcommands-modal.component.scss']
})
export class SavedcommandsModalComponent implements OnInit {

  closeResult: any;

  constructor(private modalService: NgbModal, private ajax: RestService) { }

  apiurl: string = "http://13.232.8.87:8082/api/maintenances";
  maintains: any;
  apiurlsavedcommands: string = "http://13.232.8.87:8082/api/commands";
  // savedcommands: any;
  maintainIndex: string = '';
  attributes: any = {};
  maintainEdit: any = {};
  attributeEdit: any = {};
  attributeIndex: string = '';
  typearr: any = [{ "type": "custom" },
  { "type": "deviceIdentification" }, { "type": "positionSingle" }, { "type": "positionPeriodic" }, { "type": "positionStop" }, { "type": "engineStop" }, { "type": "engineResume" }, { "type": "alarmArm" }, { "type": "alarmDisarm" }, { "type": "setTimezone" }, { "type": "requestPhoto" }, { "type": "rebootDevice" }, { "type": "sendSms" }, { "type": "sendUssd" }, { "type": "sosNumber" }, { "type": "silenceTime" }, { "type": "setPhonebook" }, { "type": "voiceMessage" }, { "type": "outputControl" }, { "type": "voiceMonitoring" }, { "type": "setAgps" }, { "type": "setIndicator" }, { "type": "configuration" }, { "type": "getVersion" }, { "type": "firmwareUpdate" }, { "type": "setConnection" }, { "type": "setOdometer" }, { "type": "getModemStatus" }, { "type": "getDeviceStatus" }, { "type": "modePowerSaving" }, { "type": "modeDeepSleep" }, { "type": "movementAlarm" }, { "type": "alarmBattery" }, { "type": "alarmSos" }, { "type": "alarmRemove" }, { "type": "alarmClock" }, { "type": "alarmSpeed" }, { "type": "alarmFall" }, { "type": "alarmVibration" }]


  ngOnInit() {
    this.getsavedcommands();
  }

  getsavedcommands() {
    this.ajax.commonget(this.apiurlsavedcommands).then((data) => {
      this.maintains = data;
      this.maintains = data;
      // this.attributes = {};
      // this.maintainIndex = '';
    }).catch(error => {
      console.error(error);
    });
  }

  maintainSelected(i: string) {
    
    this.maintainIndex = i;

    this.attributes = this.maintains[i].attributes;
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  AddmaintainSubmit(formdata, modal) {
    let driv = {
      "description": formdata.value.description,
      "textChannel": formdata.value.textChannel,
      "type": formdata.value.type
    }
    if (this.maintainIndex) {
      driv['id'] = this.maintainEdit.id;
      this.ajax.editDevice(this.apiurlsavedcommands + '/' + this.maintainEdit.id, driv, httpOptions).then((value) => {
        formdata.reset();
        modal.click();
        this.getsavedcommands();
      }).catch(() => {
        console.log('error happened');
      });
    } else {
      this.ajax.commonpost(this.apiurlsavedcommands, driv).then((value) => {
        formdata.reset();
        modal.click();
        this.getsavedcommands();
      }).catch(() => {
        console.log('error happened');
      });
    }


  }

  openModal(modal) {
    this.maintainEdit = {};
    this.maintainIndex = '';
    this.open(modal);
  }

  getKeys(arr) {
    return Object.keys(arr);
  }

  Add(modal) {
    this.maintainIndex = '';
    this.maintainEdit = {};
    this.attributes = {};
    this.open(modal);
  }

  edit(modal) {
    // this.maintainEdit['name'] = this.maintainIndex;
    this.maintainEdit = this.maintains[this.maintainIndex];
    console.log('thismaintainedit', this.maintainEdit);
    this.open(modal);
  }

  delete() {
    this.maintainEdit = this.maintains[this.maintainIndex];
    this.ajax.deleteDevice(this.apiurlsavedcommands + '/' + this.maintainEdit.id, httpOptions).then((value) => {

      this.getsavedcommands();
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


}

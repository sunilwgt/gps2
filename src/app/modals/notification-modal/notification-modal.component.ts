import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../service/rest.service';
import { HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';

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
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {
  closeResult: any;
  apiurl: string = "http://13.232.8.87:8082/api/notifications";
  apiurlTypes: string = "http://13.232.8.87:8082/api/notifications/types";
  notifys: any[];
  notifyEdit: any = {};
  notifyIndex: string = '';
  notifyTypes: any = [];
  attributes: any = {};
  attributeEdit: any = {};
  attributeIndex: any = {};

  constructor(private modalService: NgbModal, private ajax: RestService) { }

  ngOnInit() {
    this.getNotifications();
    this.ajax.get(this.apiurlTypes, httpOptions).then((data) => {
      this.notifyTypes = data;
    }).catch(error => {
      console.error(error);
    });
  }

  getNotifications() {
    this.ajax.get(this.apiurl, httpOptions).then((data) => {
      this.notifys = data;
    }).catch(error => {
      console.error(error);
    });
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

  notifySelected(i: string) {
    this.notifyIndex = i;
    this.attributes = this.notifys[i].attributes;
  }

  openModal(modal) {
    this.notifyEdit = {};
    this.notifyIndex = '';
    this.open(modal);
  }

  Add(modal) {
    this.notifyIndex = '';
    this.notifyEdit = {};
    this.attributes = {};
    this.open(modal);
  }

  edit(modal) {
    // this.notifyEdit['name'] = this.notifyIndex;
    this.notifyEdit = this.notifys[this.notifyIndex];
    this.open(modal);
  }

  delete() {
    this.notifyEdit = this.notifys[this.notifyIndex];
    this.ajax.deleteDevice(this.apiurl + '/' + this.notifyEdit.id, httpOptions).then((value) => {

      this.getNotifications();
    }).catch(() => {
      console.log('error happened');
    });
  }

  AddnotifySubmit(formdata, modal) {
    // this.notifys.push(formdata.value);
    let driv = {
      "attributes": this.attributes,
      "type": formdata.value.type,
      "always": formdata.value.always ? true : false,
      "notificators": formdata.value.notificators,
      "calendarId": formdata.value.calendarId

    }

    if (this.notifyIndex) {
      driv['id'] = this.notifyEdit.id;
      this.ajax.editDevice(this.apiurl + '/' + this.notifyEdit.id, driv, httpOptions).then((value) => {
        formdata.reset();
        modal.click();
        this.getNotifications();
      }).catch(() => {
        console.log('error happened');
      });
    } else {
      this.ajax.addDevice(this.apiurl, driv, httpOptions).then((value) => {
        formdata.reset();
        modal.click();
        this.getNotifications();
      }).catch(() => {
        console.log('error happened');
      });
    }


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

  getKeys(arr) {
    return Object.keys(arr);
  }

}

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
  selector: 'app-driver-modal',
  templateUrl: './driver-modal.component.html',
  styleUrls: ['./driver-modal.component.scss']
})
export class DriverModalComponent implements OnInit {

  closeResult: any;

  constructor(private modalService: NgbModal, private ajax: RestService) { }

  driverIndex: string = '';
  drivers: any = [];
  driverEdit: any = {};
  apiurlGetDrivers: string = "http://13.232.8.87:8082/api/drivers";
  attributes: any = {};
  attributeEdit: any = {};
  attributeIndex: string = '';

  ngOnInit() {
    this.getDrivers();
  }

  getDrivers() {
    this.ajax.get(this.apiurlGetDrivers, httpOptions).then((data) => {
      this.drivers = data;
      // this.attributes = {};
      // this.driverIndex = '';
    }).catch(error => {
      console.error(error);
    });
  }

  driverSelected(i: string) {
    this.driverIndex = i;
    this.attributes = this.drivers[i].attributes;
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

  AddDriverSubmit(formdata, modal) {
    // this.drivers.push(formdata.value);
    let driv = {
      "attributes": this.attributes,
      "name": formdata.value.name,
      "uniqueId": formdata.value.uniqueId

    }

    if (this.driverIndex) {
      driv['id'] = this.driverEdit.id;
      this.ajax.editDevice(this.apiurlGetDrivers + '/' + this.driverEdit.id, driv, httpOptions).then((value) => {
        formdata.reset();
        modal.click();
        this.getDrivers();
      }).catch(() => {
        console.log('error happened');
      });
    } else {
      this.ajax.addDevice(this.apiurlGetDrivers, driv, httpOptions).then((value) => {
        formdata.reset();
        modal.click();
        this.getDrivers();
      }).catch(() => {
        console.log('error happened');
      });
    }


  }

  openModal(modal) {
    this.driverEdit = {};
    this.driverIndex = '';
    this.open(modal);
  }

  getKeys(arr) {
    return Object.keys(arr);
  }

  Add(modal) {
    this.driverIndex = '';
    this.driverEdit = {};
    this.attributes = {};
    this.open(modal);
  }

  edit(modal) {
    // this.driverEdit['name'] = this.driverIndex;
    this.driverEdit = this.drivers[this.driverIndex];
    this.open(modal);
  }

  delete() {
    this.driverEdit = this.drivers[this.driverIndex];
    this.ajax.deleteDevice(this.apiurlGetDrivers + '/' + this.driverEdit.id, httpOptions).then((value) => {

      this.getDrivers();
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

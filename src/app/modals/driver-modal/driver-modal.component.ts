import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../service/rest.service';
import { HttpHeaders } from '@angular/common/http';

var headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/json');
headers_object.append("Authorization", "Basic" + "admin:admin");

const httpOptions = {
  withCredentials: true,
  headers: headers_object
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

  ngOnInit() {
    this.getDrivers();
  }

  getDrivers() {
    this.ajax.get(this.apiurlGetDrivers, httpOptions).then((data) => {
      this.drivers = data;
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

  AddAttributeSubmit(formdata, modal) {
    // this.drivers.push(formdata.value);
    let driv = {
      "attributes": {},
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


}

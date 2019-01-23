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
  selector: 'app-maintenance-modal',
  templateUrl: './maintenance-modal.component.html',
  styleUrls: ['./maintenance-modal.component.scss']
})
export class MaintenanceModalComponent implements OnInit {

  closeResult: any;

  constructor(private modalService: NgbModal, private ajax: RestService) { }

  apiurl: string = "http://13.232.8.87:8082/api/maintenances";
  maintains: any;
  maintainIndex: string = '';
  attributes: any = {};
  maintainEdit: any = {};
  attributeEdit: any = {};
  attributeIndex: string = '';
  typeArr: any = [{
    key: 'index',
    valueType: 'number'
  }, {
    key: 'hdop',
    valueType: 'number'
  }, {
    key: 'vdop',
    valueType: 'number'
  }, {
    key: 'pdop',
    valueType: 'number'
  }, {
    key: 'sat',
    valueType: 'number'
  }, {
    key: 'satVisible',
    valueType: 'number'
  }, {
    key: 'rssi',
    valueType: 'number'
  }, {
    key: 'gps',
    valueType: 'number'
  }, {
    key: 'odometer',
    valueType: 'number',
    dataType: 'distance'
  }, {
    key: 'serviceOdometer',
    valueType: 'number',
    dataType: 'distance'
  }, {
    key: 'tripOdometer',
    valueType: 'number',
    dataType: 'distance'
  }, {
    key: 'hours',
    valueType: 'number',
    dataType: 'hours'
  }, {
    key: 'steps',
    valueType: 'number'
  },

  {
    key: 'power',
    valueType: 'number',
    dataType: 'voltage'
  }, {
    key: 'battery',
    valueType: 'number',
    dataType: 'voltage'
  }, {
    key: 'batteryLevel',
    valueType: 'number',
    dataType: 'percentage'
  }, {
    key: 'fuel',
    valueType: 'number',
    dataType: 'volume'
  }, {
    key: 'fuelConsumption',
    valueType: 'number',
    dataType: 'consumption'
  },

  {
    key: 'distance',
    valueType: 'number',
    dataType: 'distance'
  }, {
    key: 'totalDistance',
    valueType: 'number',
    dataType: 'distance'
  }, {
    key: 'rpm',
    valueType: 'number'
  },


  {
    key: 'throttle',
    valueType: 'number'
  },

  {
    key: 'armed',
    valueType: 'number'
  },

  {
    key: 'acceleration',
    valueType: 'number'
  }, {
    key: 'deviceTemp',
    valueType: 'number',
    dataType: 'temperature'
  },

  {
    key: 'obdSpeed',
    valueType: 'number',
    dataType: 'speed'
  }, {
    key: 'obdOdometer',
    valueType: 'number',
    dataType: 'distance'
  }];

  ngOnInit() {
    this.getmaintains();
  }

  getmaintains() {
    this.ajax.get(this.apiurl, httpOptions).then((data) => {
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
    // this.maintains.push(formdata.value);
    let driv = {
      "attributes": this.attributes,
      "name": formdata.value.name,
      "period": formdata.value.period,
      "start": formdata.value.start,
      "type": formdata.value.type

    }

    if (this.maintainIndex) {
      driv['id'] = this.maintainEdit.id;
      this.ajax.editDevice(this.apiurl + '/' + this.maintainEdit.id, driv, httpOptions).then((value) => {
        formdata.reset();
        modal.click();
        this.getmaintains();
      }).catch(() => {
        console.log('error happened');
      });
    } else {
      this.ajax.addDevice(this.apiurl, driv, httpOptions).then((value) => {
        formdata.reset();
        modal.click();
        this.getmaintains();
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
    this.open(modal);
  }

  delete() {
    this.maintainEdit = this.maintains[this.maintainIndex];
    this.ajax.deleteDevice(this.apiurl + '/' + this.maintainEdit.id, httpOptions).then((value) => {

      this.getmaintains();
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

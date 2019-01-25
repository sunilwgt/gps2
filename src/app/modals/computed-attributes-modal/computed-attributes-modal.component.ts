import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../service/rest.service';
import { HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

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
  selector: 'app-computed-attributes-modal',
  templateUrl: './computed-attributes-modal.component.html',
  styleUrls: ['./computed-attributes-modal.component.scss']
})
export class ComputedAttributesModalComponent implements OnInit {

  closeResult: any;

  constructor(private modalService: NgbModal, private ajax: RestService) { }


  attributes: any = [{
    key: 'raw',
    valueType: 'string'
  }, {
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
    key: 'roaming',
    valueType: 'boolean'
  }, {
    key: 'event',
    valueType: 'string'
  }, {
    key: 'alarm',
    valueType: 'string'
  }, {
    key: 'status',
    valueType: 'string'
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
  }, {
    key: 'input',
    valueType: 'string'
  }, {
    key: 'output',
    valueType: 'string'
  }, {
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
  }, {
    key: 'versionFw',
    valueType: 'string'
  }, {
    key: 'versionHw',
    valueType: 'string'
  }, {
    key: 'type',
    valueType: 'string'
  }, {
    key: 'ignition',
    valueType: 'boolean'
  }, {
    key: 'flags',
    valueType: 'string'
  }, {
    key: 'charge',
    valueType: 'boolean'
  }, {
    key: 'ip',
    valueType: 'string'
  }, {
    key: 'archive',
    valueType: 'boolean'
  }, {
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
  }, {
    key: 'vin',
    valueType: 'string'
  }, {
    key: 'approximate',
    valueType: 'boolean'
  }, {
    key: 'throttle',
    valueType: 'number'
  }, {
    key: 'motion',
    valueType: 'boolean'
  }, {
    key: 'armed',
    valueType: 'number'
  }, {
    key: 'geofence',
    valueType: 'string'
  }, {
    key: 'acceleration',
    valueType: 'number'
  }, {
    key: 'deviceTemp',
    valueType: 'number',
    dataType: 'temperature'
  }, {
    key: 'operator',
    valueType: 'string'
  }, {
    key: 'command',
    valueType: 'string'
  }, {
    key: 'blocked',
    valueType: 'boolean'
  }, {
    key: 'dtcs',
    valueType: 'string'
  }, {
    key: 'obdSpeed',
    valueType: 'number',
    dataType: 'speed'
  }, {
    key: 'obdOdometer',
    valueType: 'number',
    dataType: 'distance'
  }, {
    key: 'result',
    valueType: 'string'
  }, {
    key: 'driverUniqueId',
    valueType: 'string',
    dataType: 'driverUniqueId'
  }];

  apiurl: string = "http://13.232.8.87:8082/api/attributes/computed";
  compAttributes: any;
  compAttributeIndex: string = '';
  compAttributeEdit: any = {};

  ngOnInit() {
    this.getcompAttributes();
  }

  getcompAttributes() {
    this.ajax.get(this.apiurl, httpOptions).then((data) => {
      this.compAttributes = data;
      // this.attributes = {};
      // this.compAttributeIndex = '';
    }).catch(error => {
      console.error(error);
    });
  }

  onChangeAttribute() {
    this.attributes.map((data) => {
      if (data.key == this.compAttributeEdit.attribute) {
        this.compAttributeEdit.type = data.valueType;
      }
    })
    // 
    console.log("this.compAttributeEdit.type");
  }

  compAttributeSelected(i: string) {
    this.compAttributeIndex = i;
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

  AddcompAttributeSubmit(formdata, modal) {
    // this.compAttributes.push(formdata.value);
    let driv = {
      "description": formdata.value.description,
      "attribute": formdata.value.attribute,
      "expression": formdata.value.expression,
      "type": this.compAttributeEdit.type


    }

    if (this.compAttributeIndex) {
      driv['id'] = this.compAttributeEdit.id;
      this.ajax.editDevice(this.apiurl + '/' + this.compAttributeEdit.id, driv, httpOptions).then((value) => {
        formdata.reset();
        modal.click();
        this.getcompAttributes();
      }).catch(() => {
        console.log('error happened');
      });
    } else {
      this.ajax.addDevice(this.apiurl, driv, httpOptions).then((value) => {
        formdata.reset();
        modal.click();
        this.getcompAttributes();
      }).catch(() => {
        console.log('error happened');
      });
    }


  }

  openModal(modal) {
    this.compAttributeEdit = {};
    this.compAttributeIndex = '';
    this.open(modal);
  }

  getKeys(arr) {
    return Object.keys(arr);
  }

  Add(modal) {
    this.compAttributeIndex = '';
    this.compAttributeEdit = {};
    this.open(modal);
  }

  edit(modal) {
    // this.compAttributeEdit['name'] = this.compAttributeIndex;
    this.compAttributeEdit = this.compAttributes[this.compAttributeIndex];
    this.open(modal);
  }

  delete() {
    this.compAttributeEdit = this.compAttributes[this.compAttributeIndex];
    this.ajax.deleteDevice(this.apiurl + '/' + this.compAttributeEdit.id, httpOptions).then((value) => {

      this.getcompAttributes();
    }).catch(() => {
      console.log('error happened');
    });
  }

}

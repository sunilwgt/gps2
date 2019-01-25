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
declare var ol: any;

@Component({
  selector: 'app-geofence-modal',
  templateUrl: './geofence-modal.component.html',
  styleUrls: ['./geofence-modal.component.scss']
})
export class GeofenceModalComponent implements OnInit {

  closeResult: any;
  attrNames: any[] = [{
    key: 'color',
    valueType: 'color'
  }, {
    key: 'speedLimit',
    valueType: 'number',
    dataType: 'speed'
  }, {
    key: 'polylineDistance',
    valueType: 'number',
    dataType: 'distance'
  }]

  constructor(private modalService: NgbModal, private ajax: RestService) { }

  geofenceIndex: string = '';
  geofences: any = [];
  geofenceEdit: any = {};
  apiurlGetgeofences: string = "http://13.232.8.87:8082/api/geofences";
  attributes: any = {};
  attributeEdit: any = {};
  attributeIndex: string = '';
  attributeNameSelected: string = '';
  areaMap: any;
  latitude: number = 18.5204;
  longitude: number = 73.8567;
  zoom: number = 2;

  ngOnInit() {
    this.areaMap = new ol.Map({
      target: 'areaMap',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([this.longitude, this.latitude]),
        zoom: this.zoom
      })
    });
    this.getgeofences();
  }

  onAttrNameChange(val) {
    this.attributeNameSelected = val;
  }

  getgeofences() {
    this.ajax.get(this.apiurlGetgeofences, httpOptions).then((data) => {
      this.geofences = data;
      // this.attributes = {};
      // this.geofenceIndex = '';
    }).catch(error => {
      console.error(error);
    });
  }

  geofenceSelected(i: string) {
    this.geofenceIndex = i;
    this.attributes = this.geofences[i].attributes;
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

  AddgeofenceSubmit(formdata, modal) {
    // this.geofences.push(formdata.value);
    let driv = {
      "attributes": this.attributes,
      "name": formdata.value.name,
      "description": formdata.value.description,
      "calendarId": formdata.value.calendarId

    }

    if (this.geofenceIndex) {
      driv['id'] = this.geofenceEdit.id;
      this.ajax.editDevice(this.apiurlGetgeofences + '/' + this.geofenceEdit.id, driv, httpOptions).then((value) => {
        formdata.reset();
        modal.click();
        this.getgeofences();
      }).catch(() => {
        console.log('error happened');
      });
    } else {
      this.ajax.addDevice(this.apiurlGetgeofences, driv, httpOptions).then((value) => {
        formdata.reset();
        modal.click();
        this.getgeofences();
      }).catch(() => {
        console.log('error happened');
      });
    }


  }

  openModal(modal) {
    this.geofenceEdit = {};
    this.geofenceIndex = '';
    this.open(modal);
  }

  getKeys(arr) {
    return Object.keys(arr);
  }

  Add(modal) {
    this.geofenceIndex = '';
    this.geofenceEdit = {};
    this.attributes = {};
    this.open(modal);
  }

  edit(modal) {
    // this.geofenceEdit['name'] = this.geofenceIndex;
    this.geofenceEdit = this.geofences[this.geofenceIndex];
    this.open(modal);
  }

  delete() {
    this.geofenceEdit = this.geofences[this.geofenceIndex];
    this.ajax.deleteDevice(this.apiurlGetgeofences + '/' + this.geofenceEdit.id, httpOptions).then((value) => {

      this.getgeofences();
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

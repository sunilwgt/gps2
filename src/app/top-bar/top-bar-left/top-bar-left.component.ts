import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CommonServiceService } from '../../service/common-service.service';
import { RestService } from '../../service/rest.service';




var headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/json');
headers_object.append("Authorization", "Basic" + "admin:admin");

const httpOptions = {
  withCredentials: true,
  headers: headers_object
};


@Component({
  selector: 'app-top-bar-left',
  templateUrl: './top-bar-left.component.html',
  styleUrls: ['./top-bar-left.component.scss'],
})
export class TopBarLeftComponent implements OnInit {
  model: any = {
    'disabled': false
  };
  closeResult: string;

  constructor(private modalService: NgbModal, public CommonService: CommonServiceService, private ajax: RestService, ) { }

  @ViewChild('DeviceForm') deviceForm: NgForm;
  @ViewChild('deviceclose') closedeviceform: any;
  apiurladd: string = "http://13.232.8.87:8082/api/devices/";
  apiurlGetGroup: string = "http://13.232.8.87:8082/api/groups/";
  groups: any = [];
  category: any = ['arrow', 'default', 'animal', 'bicycle', 'boat', 'bus', 'car', 'train', 'hellicopter'];



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

  ngOnInit() {
    this.ajax.get(this.apiurlGetGroup, httpOptions).then((data) => {
      this.groups = data;
    }).catch(error => {
      console.error(error);
    });
  }

  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }

  AddSubmit(data: NgForm, closeModal: any) {
    let deviceData = data.value;
    var device = {
      "attributes": {
        "decoder.timezone": "Pacific/Wallis"
      },
      "groupId": deviceData.group,
      "name": deviceData.name,
      "uniqueId": deviceData.id,
      "phone": deviceData.phone,
      "model": deviceData.model,
      "contact": deviceData.contact,
      "category": deviceData.category,
      "disabled": deviceData.disabled ? true : false
    };

    this.ajax.addDevice(this.apiurladd, device, httpOptions).then((value) => {
      data.reset();
      closeModal.click();
      this.ajax.get(this.apiurladd, httpOptions).then((value) => {
        this.CommonService.deviceemit(value)
      }).catch(() => {
        console.error('error happened');
      });
    }).catch(() => {
      console.log('error happened');
    });
  }


  addDevice(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



}

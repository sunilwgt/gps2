import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonServiceService } from '../../service/common-service.service';
import { RestService } from '../../service/rest.service';
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
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.scss']
})
export class GroupModalComponent implements OnInit {

  apiurl: string = "http://13.232.8.87:8082/api/groups";
  closeResult: string;
  attributes: any = {};
  groupEdit: any = {};
  groups: any = {};
  groupIndex: any = '';
  attributeEdit: any = {};
  attributeIndex: string = '';

  constructor(private modalService: NgbModal, public CommonService: CommonServiceService, private ajax: RestService) { }

  ngOnInit() {
    this.getGroups();
  }

  getGroups() {
    this.ajax.get(this.apiurl, httpOptions).then((data) => {
      this.groups = data;
    }).catch(error => {
      console.error(error);
    });
  }

  groupSelected(i) {
    this.groupIndex = i;
    this.attributes = this.groups[this.groupIndex].attributes;
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

  openGroup(modal) {
    this.groupIndex = '';
    this.groupEdit = {};
    this.attributes = {};
    this.attributeIndex = '';
    this.open(modal);
  }

  AddGroupSubmit(data: NgForm, closeModal: any) {
    let deviceData = data.value;
    var device = {
      "attributes": this.attributes,
      "groupId": deviceData.groupId,
      "name": deviceData.name
    };

    if (this.groupIndex) {
      device['id'] = this.groupEdit.id;
      this.ajax.editDevice(this.apiurl + '/' + this.groupEdit.id, device, httpOptions).then((value) => {
        data.reset();
        closeModal.click();
        this.getGroups();
      }).catch(() => {
        console.log('error happened');
      });
    } else {
      this.ajax.addDevice(this.apiurl, device, httpOptions).then((value) => {
        data.reset();
        closeModal.click();
        this.getGroups();
      }).catch(() => {
        console.log('error happened');
      });
    }


  }



  editGroup(modal) {
    this.groupEdit = this.groups[this.groupIndex];
    this.open(modal);
  }

  deleteGroup(modal) {
    this.groupEdit = this.groups[this.groupIndex];
    this.ajax.deleteDevice(this.apiurl + '/' + this.groupEdit.id, httpOptions).then((value) => {

      this.getGroups();
    }).catch(() => {
      console.log('error happened');
    });
  }

  AddGroup(modal) {
    this.groupIndex = '';
    this.groupEdit = {};
    this.attributes = {};
    this.open(modal);
  }

  getKeys(arr) {
    return Object.keys(arr);
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

import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from '../../service/rest.service';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';

var headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/json');
headers_object.append("Authorization", "Basic" + "admin:admin");

const httpOptions = {
  withCredentials: true,
  headers: headers_object
};


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics-modal.component.html',
  styleUrls: ['./statistics-modal.component.scss']
})
export class StatisticsModalComponent implements OnInit {

  closeResult: any;

  constructor(private modalService: NgbModal, private ajax: RestService) { }

  apiurl: string = "http://13.232.8.87:8082/api/statistics/";
  maintains: any;
  maintainIndex: string = '';
  attributes: any = {};
  maintainEdit: any = {};
  attributeEdit: any = {};
  attributeIndex: string = '';
  calenderfile: string;
  fromdate: Date;
  todate: Date;
  fromstatus = false;
  tostatus = false;
  ngOnInit() {
    // this.getstatistics();
  }


  fromdatechange(e: Date) {
    this.fromdate = new Date(e);
  }

  todatechange(e: Date) {
    this.todate = new Date(e);
  }


  getstatistics() {
    const from = this.fromdate.toISOString()
    const to = this.todate.toISOString()
    this.ajax.commonget(this.apiurl + `?&from=${from}&to=${to}`).then((data) => {
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
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
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

  onFileChange(evt) {
    var f = evt.target.files[0]; // FileList object
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function (theFile) {
      return function (e) {
        var binaryData = e.target.result;
        //Converting Binary Data to base 64
        var base64String = window.btoa(binaryData);
        this.calenderfile = base64String;
        //showing file converted to base64
        document.getElementById('base64').innerHTML = base64String;
        // alert('File converted to base64 successfuly!\nCheck in Textarea');
      };
    })(f);
    // Read in the image file as a data URL.
    reader.readAsBinaryString(f);

  }


  AddmaintainSubmit(formdata, modal) {
    const data = document.getElementById('base64').innerHTML;
    // this.maintains.push(formdata.value);
    let driv = {
      "attributes": this.attributes,
      "name": formdata.value.name,
      "data": data

    }
    if (this.maintainIndex) {
      driv['id'] = this.maintainEdit.id;
      this.ajax.editDevice(this.apiurl + '/' + this.maintainEdit.id, driv, httpOptions).then((value) => {
        formdata.reset();
        modal.click();
        this.getstatistics();
      }).catch((error) => {
        console.log('error happened', error);
      });
    } else {
      this.ajax.addDevice(this.apiurl, driv, httpOptions).then((value) => {
        formdata.reset();
        modal.click();
        this.getstatistics();
      }).catch((error) => {
        console.log('error happened', error);
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

      this.getstatistics();
    }).catch((error) => {

      console.log('error happened', error);
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

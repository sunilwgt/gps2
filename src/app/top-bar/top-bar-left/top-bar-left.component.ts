import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
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
  model: any = {};
  closeResult: string;

  constructor(private modalService: NgbModal, public CommonService: CommonServiceService, private ajax: RestService, ) { }

  apiurladd: string = "http://13.232.8.87:8082/api/devices/";



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
  }


  onSubmit() {
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model))
  }


  addDevice() {
    var device = {
      "attributes": {
        "decoder.timezone": "Pacific/Wallis"
      },
      "groupId": 0,
      "name": "test33",
      "uniqueId": "333434343435",
      "phone": "",
      "model": "",
      "contact": "",
      "category": "bicycle",
      "disabled": false
    };

    this.ajax.addDevice(this.apiurladd, device, httpOptions).then((value) => {
      alert("Device sussessfuly Added")
    }).catch(() => {
      console.log('error happened');
    });
  }



}

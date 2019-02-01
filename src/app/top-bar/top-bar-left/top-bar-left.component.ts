import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { CommonServiceService } from '../../service/common-service.service';
import { RestService } from '../../service/rest.service';
import { AuthenticationService } from 'src/app/Authentication/authentication.service';




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

  closeResult: string;



  constructor(private modalService: NgbModal, public CommonService: CommonServiceService, private ajax: RestService, 
    private authservice:AuthenticationService
    ) { }

  @ViewChild('DeviceForm') deviceForm: NgForm;
  @ViewChild('deviceclose') closedeviceform: any;
  @ViewChild('Device') Device: any;
  apiurladd: string = "http://13.232.8.87:8082/api/devices/";
  apiurlGetGroup: string = "http://13.232.8.87:8082/api/groups/";



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

  }
  onlogout(){
this.authservice.onlogout()
  }
  getmapstate(){


  }

}

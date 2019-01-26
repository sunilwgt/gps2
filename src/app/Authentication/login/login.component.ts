import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IPerfLoggingPrefs } from 'selenium-webdriver/chrome';
import { RestService } from 'src/app/service/rest.service';
import { AuthenticationService } from '../authentication.service';
import { getDefaultService } from 'selenium-webdriver/opera';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticatiionservice: AuthenticationService) {

  }

  ngOnInit() {
    this.getuser()
  }
  onlogin(form: NgForm) {
    this.authenticatiionservice.login(form.value).then((res) => {
      if (res) {
      }
    }, error => {
      console.log('error login ', error);
    })

  }

  getuser() {
    const user = sessionStorage.getItem('currentuser');
    if (user) {
   
      this.authenticatiionservice.settologgedin(user);
    }
    else {
      console.log('You are NOt Logged in , Please login to continue');

    }
  }


}

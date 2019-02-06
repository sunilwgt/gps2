import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IPerfLoggingPrefs } from 'selenium-webdriver/chrome';
import { RestService } from 'src/app/service/rest.service';
import { AuthenticationService } from '../authentication.service';
import { getDefaultService } from 'selenium-webdriver/opera';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticatiionservice: AuthenticationService ,
    private snackbar: MatSnackBar) {

  }

  ngOnInit() {
    this.getuser()
  }
  onlogin(form: NgForm) {
    this.authenticatiionservice.login(form.value).then((res) => {
      if (res) {
        const stringres = JSON.stringify(res);
        const parsed = JSON.parse(stringres)
        console.log(res)
      this.snackbar.open( 'Welcome ' + parsed.name, 'Close', { duration: 3000 });


      }
    }, error => {
      console.log('error login ', error);
      this.snackbar.open(error.error, 'Close', { duration: 3000 });

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

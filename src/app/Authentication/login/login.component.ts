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
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AbstractControl, ValidatorFn } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user_data: FormGroup;

  constructor(private authenticatiionservice: AuthenticationService, private formBuilder: FormBuilder,
    private snackbar: MatSnackBar) {
    this.user_data = this.formBuilder.group({
      email: new FormControl('', [Validators.required, patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.getuser()
  }

  onlogin() {
      this.authenticatiionservice.login(this.user_data.value).then((res) => {
        if (res) {
          const stringres = JSON.stringify(res);
          const parsed = JSON.parse(stringres)
          this.snackbar.open('Welcome ' + parsed.name, 'Close', { duration: 3000 });
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
      this.snackbar.open("You are not logged in , Please login to continue", 'Close', { duration: 3000 });
      // console.log('You are not  logged in , Please login to continue');
    }
  }
}
export function patternValidator(regexp: RegExp): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const value = control.value;
    if (value === '') {
      return null;
    }
    return !regexp.test(value) ? { 'patternInvalid': { regexp } } : null;
  };
}

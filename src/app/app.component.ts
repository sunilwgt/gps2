import { Component } from '@angular/core';
import { AuthenticationService } from './Authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoogedin: boolean;
  title = 'GPS-Tracking';

  constructor(private authservice: AuthenticationService) {

    this.authservice.loginsub.subscribe((res: boolean) => {
      this.isLoogedin = res;
      if (res) {
        res.toString();
        this.isLoogedin = res;
      }
    }, error => {
      console.log('error', error);
    })
  }

}

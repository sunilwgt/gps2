import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopBarComponent } from './top-bar/top-bar.component';
import { TopBarLeftComponent } from './top-bar/top-bar-left/top-bar-left.component';
import { MainBodyComponent } from './main-body/main-body.component';
import { SidePanelComponent } from './main-body/side-panel/side-panel.component';
import { LeftSideBarComponent } from './main-body/left-side-bar/left-side-bar.component';
import { ObjectDetailsComponent } from './main-body/side-panel/object-details/object-details.component';
import { ObjectDeviceComponent } from './main-body/side-panel/object-device/object-device.component';
import { UserModalComponent } from './modals/user-modal/user-modal.component';
import { DeviceModalComponent } from './modals/device-modal/device-modal.component';
import { DriverModalComponent } from './modals/driver-modal/driver-modal.component';




@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    TopBarLeftComponent,
    MainBodyComponent,
    SidePanelComponent,
    LeftSideBarComponent,
    ObjectDetailsComponent,
    ObjectDeviceComponent,
    UserModalComponent,
    DeviceModalComponent,
    DriverModalComponent,
  ],


  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    FormsModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

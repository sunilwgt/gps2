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
import { GroupModalComponent } from './modals/group-modal/group-modal.component';
import { NotificationModalComponent } from './modals/notification-modal/notification-modal.component';
import { ComputedAttributesModalComponent } from './modals/computed-attributes-modal/computed-attributes-modal.component';
import { MaintenanceModalComponent } from './modals/maintenance-modal/maintenance-modal.component';
import { AccountModalComponent } from './modals/account-modal/account-modal.component';
import { GeofenceModalComponent } from './modals/geofence-modal/geofence-modal.component';
import { SignupComponent } from './Authentication/signup/signup.component';
import { LoginComponent } from './Authentication/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatSnackBarModule, MatFormFieldModule, MatSelectModule,
   MatCheckboxModule, MatInputModule, } from '@angular/material';
import { ServerModalComponent } from './modals/server-modal/server-modal.component';


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
    GroupModalComponent,
    NotificationModalComponent,
    AccountModalComponent,
    ServerModalComponent,
    ComputedAttributesModalComponent,
    MaintenanceModalComponent,
    GeofenceModalComponent,
    SignupComponent,
    LoginComponent
  ],


  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

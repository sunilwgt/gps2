import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


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
  ],

  
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    AngularFontAwesomeModule, 
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

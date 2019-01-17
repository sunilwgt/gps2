import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectDeviceComponent } from './object-device.component';

describe('ObjectDeviceComponent', () => {
  let component: ObjectDeviceComponent;
  let fixture: ComponentFixture<ObjectDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

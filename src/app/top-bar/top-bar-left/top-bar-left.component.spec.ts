import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopBarLeftComponent } from './top-bar-left.component';

describe('TopBarLeftComponent', () => {
  let component: TopBarLeftComponent;
  let fixture: ComponentFixture<TopBarLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopBarLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

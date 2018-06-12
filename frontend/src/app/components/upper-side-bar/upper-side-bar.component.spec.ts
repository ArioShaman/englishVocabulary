import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpperSideBarComponent } from './upper-side-bar.component';

describe('UpperSideBarComponent', () => {
  let component: UpperSideBarComponent;
  let fixture: ComponentFixture<UpperSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpperSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpperSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

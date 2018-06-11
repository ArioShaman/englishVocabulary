import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocsComponent } from './vocs.component';

describe('VocsComponent', () => {
  let component: VocsComponent;
  let fixture: ComponentFixture<VocsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

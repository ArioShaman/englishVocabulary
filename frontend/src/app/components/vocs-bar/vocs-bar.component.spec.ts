import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocsBarComponent } from './vocs-bar.component';

describe('VocsBarComponent', () => {
  let component: VocsBarComponent;
  let fixture: ComponentFixture<VocsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

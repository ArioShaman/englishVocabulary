import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VocAddComponent } from './voc-add.component';

describe('VocAddComponent', () => {
  let component: VocAddComponent;
  let fixture: ComponentFixture<VocAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VocAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VocAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

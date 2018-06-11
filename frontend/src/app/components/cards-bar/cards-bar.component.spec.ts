import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsBarComponent } from './cards-bar.component';

describe('CardsBarComponent', () => {
  let component: CardsBarComponent;
  let fixture: ComponentFixture<CardsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

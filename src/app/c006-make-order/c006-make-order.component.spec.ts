import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C006MakeOrderComponent } from './c006-make-order.component';

describe('C006MakeOrderComponent', () => {
  let component: C006MakeOrderComponent;
  let fixture: ComponentFixture<C006MakeOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C006MakeOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C006MakeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C004SaleComponent } from './c004-sale.component';

describe('C004SaleComponent', () => {
  let component: C004SaleComponent;
  let fixture: ComponentFixture<C004SaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C004SaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C004SaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

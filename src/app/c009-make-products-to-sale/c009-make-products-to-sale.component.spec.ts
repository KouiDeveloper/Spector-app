import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C009MakeProductsToSaleComponent } from './c009-make-products-to-sale.component';

describe('C009MakeProductsToSaleComponent', () => {
  let component: C009MakeProductsToSaleComponent;
  let fixture: ComponentFixture<C009MakeProductsToSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C009MakeProductsToSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C009MakeProductsToSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

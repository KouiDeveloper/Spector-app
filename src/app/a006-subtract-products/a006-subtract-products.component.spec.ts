import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A006SubtractProductsComponent } from './a006-subtract-products.component';

describe('A006SubtractProductsComponent', () => {
  let component: A006SubtractProductsComponent;
  let fixture: ComponentFixture<A006SubtractProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A006SubtractProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A006SubtractProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

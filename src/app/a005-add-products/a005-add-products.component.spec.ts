import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A005AddProductsComponent } from './a005-add-products.component';

describe('A005AddProductsComponent', () => {
  let component: A005AddProductsComponent;
  let fixture: ComponentFixture<A005AddProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A005AddProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A005AddProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

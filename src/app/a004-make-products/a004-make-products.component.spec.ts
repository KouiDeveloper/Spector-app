import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A004MakeProductsComponent } from './a004-make-products.component';

describe('A004MakeProductsComponent', () => {
  let component: A004MakeProductsComponent;
  let fixture: ComponentFixture<A004MakeProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A004MakeProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A004MakeProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

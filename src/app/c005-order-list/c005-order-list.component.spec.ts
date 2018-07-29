import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C005OrderListComponent } from './c005-order-list.component';

describe('C005OrderListComponent', () => {
  let component: C005OrderListComponent;
  let fixture: ComponentFixture<C005OrderListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C005OrderListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C005OrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

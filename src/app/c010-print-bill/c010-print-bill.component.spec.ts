import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C010PrintBillComponent } from './c010-print-bill.component';

describe('C010PrintBillComponent', () => {
  let component: C010PrintBillComponent;
  let fixture: ComponentFixture<C010PrintBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C010PrintBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C010PrintBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

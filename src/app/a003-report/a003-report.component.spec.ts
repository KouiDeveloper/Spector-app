import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A003ReportComponent } from './a003-report.component';

describe('A003ReportComponent', () => {
  let component: A003ReportComponent;
  let fixture: ComponentFixture<A003ReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A003ReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A003ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

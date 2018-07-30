import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C007ListEmployeeComponent } from './c007-list-employee.component';

describe('C007ListEmployeeComponent', () => {
  let component: C007ListEmployeeComponent;
  let fixture: ComponentFixture<C007ListEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C007ListEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C007ListEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

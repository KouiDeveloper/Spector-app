import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C008ChangePasswordComponent } from './c008-change-password.component';

describe('C008ChangePasswordComponent', () => {
  let component: C008ChangePasswordComponent;
  let fixture: ComponentFixture<C008ChangePasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C008ChangePasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C008ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

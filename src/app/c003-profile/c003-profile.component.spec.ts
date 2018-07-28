import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C003ProfileComponent } from './c003-profile.component';

describe('C003ProfileComponent', () => {
  let component: C003ProfileComponent;
  let fixture: ComponentFixture<C003ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C003ProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C003ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

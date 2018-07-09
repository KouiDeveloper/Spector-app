import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A002IndexComponent } from './a002-index.component';

describe('A002IndexComponent', () => {
  let component: A002IndexComponent;
  let fixture: ComponentFixture<A002IndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A002IndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A002IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

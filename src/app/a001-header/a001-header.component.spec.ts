import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { A001HeaderComponent } from './a001-header.component';

describe('A001HeaderComponent', () => {
  let component: A001HeaderComponent;
  let fixture: ComponentFixture<A001HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ A001HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(A001HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

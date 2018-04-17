import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeStartComponent } from './employee-start.component';

describe('EmployeeStartComponent', () => {
  let component: EmployeeStartComponent;
  let fixture: ComponentFixture<EmployeeStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

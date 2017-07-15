import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceEmployeeComponent } from './absence-employee.component';

describe('AbsenceEmployeeComponent', () => {
  let component: AbsenceEmployeeComponent;
  let fixture: ComponentFixture<AbsenceEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbsenceEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbsenceEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

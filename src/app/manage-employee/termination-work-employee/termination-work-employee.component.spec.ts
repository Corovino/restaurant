import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminationWorkEmployeeComponent } from './termination-work-employee.component';

describe('TerminationWorkEmployeeComponent', () => {
  let component: TerminationWorkEmployeeComponent;
  let fixture: ComponentFixture<TerminationWorkEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminationWorkEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminationWorkEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

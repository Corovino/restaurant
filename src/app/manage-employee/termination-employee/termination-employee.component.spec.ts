import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminationEmployeeComponent } from './termination-employee.component';

describe('TerminationEmployeeComponent', () => {
  let component: TerminationEmployeeComponent;
  let fixture: ComponentFixture<TerminationEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminationEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminationEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

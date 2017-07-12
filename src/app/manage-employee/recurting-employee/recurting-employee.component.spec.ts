import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurtingEmployeeComponent } from './recurting-employee.component';

describe('RecurtingEmployeeComponent', () => {
  let component: RecurtingEmployeeComponent;
  let fixture: ComponentFixture<RecurtingEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurtingEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurtingEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

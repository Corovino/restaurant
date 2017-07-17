import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogsUserComponent } from './logs-user.component';

describe('LogsUserComponent', () => {
  let component: LogsUserComponent;
  let fixture: ComponentFixture<LogsUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogsUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

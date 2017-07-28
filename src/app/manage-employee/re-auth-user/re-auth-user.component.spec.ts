import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReAuthUserComponent } from './re-auth-user.component';

describe('ReAuthUserComponent', () => {
  let component: ReAuthUserComponent;
  let fixture: ComponentFixture<ReAuthUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReAuthUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReAuthUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

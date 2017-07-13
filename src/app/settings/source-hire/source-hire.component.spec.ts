import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceHireComponent } from './source-hire.component';

describe('SourceHireComponent', () => {
  let component: SourceHireComponent;
  let fixture: ComponentFixture<SourceHireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceHireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceHireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

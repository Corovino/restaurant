import { TestBed, inject } from '@angular/core/testing';

import { LogsUserService } from './logs-user.service';

describe('LogsUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogsUserService]
    });
  });

  it('should be created', inject([LogsUserService], (service: LogsUserService) => {
    expect(service).toBeTruthy();
  }));
});

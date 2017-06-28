import { TestBed, inject } from '@angular/core/testing';

import { DatauserService } from './datauser.service';

describe('DatauserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatauserService]
    });
  });

  it('should be created', inject([DatauserService], (service: DatauserService) => {
    expect(service).toBeTruthy();
  }));
});

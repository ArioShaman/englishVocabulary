import { TestBed, inject } from '@angular/core/testing';

import { DarkModeService } from './dark-mode.service';

describe('DarkModeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DarkModeService]
    });
  });

  it('should be created', inject([DarkModeService], (service: DarkModeService) => {
    expect(service).toBeTruthy();
  }));
});

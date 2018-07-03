import { TestBed, inject } from '@angular/core/testing';

import { CardDestroyService } from './card-destroy.service';

describe('CardDestroyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardDestroyService]
    });
  });

  it('should be created', inject([CardDestroyService], (service: CardDestroyService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { ChangeViewService } from './change-view.service';

describe('ChangeViewService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangeViewService]
    });
  });

  it('should be created', inject([ChangeViewService], (service: ChangeViewService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { UpdateNotesService } from './update-notes.service';

describe('UpdateNotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateNotesService]
    });
  });

  it('should be created', inject([UpdateNotesService], (service: UpdateNotesService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { DialogNewsService } from './dialog-news.service';

describe('DialogNewsService', () => {
  let service: DialogNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

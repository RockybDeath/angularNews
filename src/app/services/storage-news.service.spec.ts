import { TestBed } from '@angular/core/testing';

import { StorageNewsService } from './storage-news.service';

describe('StorageNewsService', () => {
  let service: StorageNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { NewsConnectorService } from './news-connector.service';

describe('NewsConnectorService', () => {
  let service: NewsConnectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsConnectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

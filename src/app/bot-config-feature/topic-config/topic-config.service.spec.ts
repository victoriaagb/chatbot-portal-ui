import { TestBed, inject } from '@angular/core/testing';

import { TopicConfigService } from './topic-config.service';

describe('TopicConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicConfigService]
    });
  });

  it('should be created', inject([TopicConfigService], (service: TopicConfigService) => {
    expect(service).toBeTruthy();
  }));
});

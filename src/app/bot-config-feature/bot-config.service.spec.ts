import { TestBed, inject } from '@angular/core/testing';

import { BotConfigService } from './bot-config.service';

describe('BotConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BotConfigService]
    });
  });

  it('should be created', inject([BotConfigService], (service: BotConfigService) => {
    expect(service).toBeTruthy();
  }));
});

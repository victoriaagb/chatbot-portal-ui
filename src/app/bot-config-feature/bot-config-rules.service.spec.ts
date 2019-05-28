import { TestBed, inject } from '@angular/core/testing';

import { BotConfigRulesService } from './bot-config-rules.service';

describe('BotConfigRulesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BotConfigRulesService]
    });
  });

  it('should be created', inject([BotConfigRulesService], (service: BotConfigRulesService) => {
    expect(service).toBeTruthy();
  }));
});

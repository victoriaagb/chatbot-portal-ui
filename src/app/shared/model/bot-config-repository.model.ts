import { BotConfig } from './bot-config.model';
import { BotStatus } from './bot-status.enum';
import { BotStepConfig } from './bot-step-config.enum';

export interface BotConfigRepository {
  id?: string;
  botId: string;
  stepConfig: BotStepConfig;
  value: BotConfig;
  status: BotStatus;
  updatedTimestamp?: string;
}

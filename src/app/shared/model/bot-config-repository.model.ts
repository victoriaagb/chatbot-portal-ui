import { BotConfig } from './bot-config.model';
import { BotStatus } from './bot-status.enum';

export interface BotConfigRepository {
  id?: string;
  botId: string;
  stepConfig: string;
  value: BotConfig;
  status: BotStatus;
  update_ts?: string;
}

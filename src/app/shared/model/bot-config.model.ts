import { Name } from './name.model';
import { Topic } from './topic.model';
export interface BotConfig {
    topics: Topic[],
    name: Name
}

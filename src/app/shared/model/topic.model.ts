import { AdditionalDisplay } from './additional-display.model';
import { Response } from './topic/response.model';

export interface Topic {
    topicId: string;
    name: string;
    status?: string;
    questions?: string[];
    answers?: Response[];
    additionalDisplay?: AdditionalDisplay;
}

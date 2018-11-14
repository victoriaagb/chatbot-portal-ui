import { AdditionalDisplay } from './additional-display.model';
import { Response } from './response.model';

export interface Topic {
    name: string;
    status?: string;
    questions?: String[];
    answers?: Response[];
    additionalDisplay?: AdditionalDisplay;
}

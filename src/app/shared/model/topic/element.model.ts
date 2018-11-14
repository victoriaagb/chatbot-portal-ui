import { Button } from './button.model';
import { Action } from './action.model';

export interface Element {
    title?: string;
    image_url?: string;
    subtitle?: string;
    buttons?: Button[];
    media_type?: string;
    url?: string;
    action?: Action;
}

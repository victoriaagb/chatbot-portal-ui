import { Button } from './button.model';
import { Element } from './element.model';
export interface Payload {
    sharable?: string;
    template_type?: string;
    text?: string;
    elements?: Element[];
    buttons?: Button[];
    isReusable?: string;
    url?: string;
}

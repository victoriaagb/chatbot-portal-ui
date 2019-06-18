import { KycButton } from './button.model';
import { KycElement } from './element.model';
export interface KycPayload {
    sharable?: string;
    template_type?: string;
    text?: string;
    elements?: KycElement[];
    buttons?: KycButton[];
    isReusable?: string;
    url?: string;
}

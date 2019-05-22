import { KycButton } from './button.model';
import { KycAction } from './action.model';

export interface KycElement {
    title?: string;
    image_url?: string;
    subtitle?: string;
    buttons?: KycButton[];
    media_type?: string;
    url?: string;
    action?: KycAction;
}

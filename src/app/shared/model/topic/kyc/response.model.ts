import { KycAttachment } from './attachment.model';

export interface KycResponse {
    text?: string;
    attachment?: KycAttachment;
}

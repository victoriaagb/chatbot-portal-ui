import { KycPayload } from './payload.model';

export interface KycAttachment {
    payload?: KycPayload;
    type?: string;
}

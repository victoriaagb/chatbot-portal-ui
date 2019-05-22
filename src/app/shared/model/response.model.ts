import { KycAttachment } from './topic/kyc/attachment.model';

export interface Response {
    text?: string;
    attachment?: KycAttachment;
}

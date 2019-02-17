import { Attachment } from './topic/old/attachment.model';

export interface Response {
    text?: string;
    attachment?: Attachment;
}

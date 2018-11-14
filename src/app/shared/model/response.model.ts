import { Attachment } from './topic/attachment.model';

export interface Response {
    text?: string;
    attachment?: Attachment;
}

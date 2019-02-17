import { Payload } from './payload.model';

export interface Response {
  response_type: TopicResponseType;
  payload: Payload;
}

export enum TopicResponseType {
  MEDIA,
  TEXT,
  BUTTON,
  ELEMENT
}

import { Payload } from './payload.model';

export interface Response {
  response_type: TopicResponseType;
  payload: Payload;
}

export enum TopicResponseType {
  MEDIA = 'RESPONSE_TYPE_MEDIA',
  TEXT = 'RESPONSE_TYPE_TEXT',
  BUTTON = 'RESPONSE_TYPE_BUTTON',
  ELEMENT = 'RESPONSE_TYPE_ELEMENT'
}

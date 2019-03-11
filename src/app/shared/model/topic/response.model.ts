import { Payload } from './payload.model';

export interface Response {
  response_type: TopicResponseType;
  payload: Payload;
}

export enum TopicResponseType {
  MEDIA = 'MEDIA',
  TEXT = 'TEXT',
  BUTTON = 'BUTTON',
  ELEMENT = 'ELEMENT'
}

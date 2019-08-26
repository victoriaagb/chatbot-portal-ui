
export interface Button {
    title?: string;
    type?: ButtonType;
    url?: string;
    payload?: string;
    payloadTopicId?: string;
}

export enum ButtonType {
  PAYLOAD = 'postback',
  URL = 'web_url'
}

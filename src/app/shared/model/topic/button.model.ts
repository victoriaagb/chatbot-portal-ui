
export interface Button {
    title?: string;
    type?: ButtonType;
    url?: string;
    payload?: string;
}

export enum ButtonType {
  PAYLOAD = 'PAYLOAD',
  URL = 'URL'
}

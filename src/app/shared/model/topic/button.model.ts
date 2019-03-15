
export interface Button {
    title?: string;
    type?: string;
    url?: string;
    payload?: string;
}

export enum ButtonType {
  PAYLOAD = 'PAYLOAD',
  URL = 'URL'
}

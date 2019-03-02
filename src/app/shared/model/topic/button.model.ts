
export interface Button {
    title?: string;
    type?: string;
    url?: string;
    payload?: string;
}

export enum ButtonType {
  PAYLOAD = 'BUTTON_TYPE_PAYLOAD',
  URL = 'BUTTON_TYPE_URL'
}

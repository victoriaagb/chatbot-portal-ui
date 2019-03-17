
export interface Media {
  type: MediaType;
  url: string;
}

export enum MediaType {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE'
}

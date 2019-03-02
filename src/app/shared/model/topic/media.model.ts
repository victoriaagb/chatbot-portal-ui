
export interface Media {
  type: MediaType;
  url: string;
}

export enum MediaType {
  VIDEO = 'MEDIA_TYPE_VIDEO',
  IMAGE = 'MEDIA_TYPE_IMAGE'
}

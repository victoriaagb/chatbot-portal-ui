import { Button } from './button.model';
import { Media } from './media.model';

export interface Payload {
  text: string;
  buttons: Button[];
  media: Media;
}

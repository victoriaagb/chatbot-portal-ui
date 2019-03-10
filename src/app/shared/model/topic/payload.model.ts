import { Button } from './button.model';
import { Media } from './media.model';
import { Element } from './element.model';

export interface Payload {
  text?: string;
  buttons?: Button[];
  media?: Media;
  elements?: Element[];
}

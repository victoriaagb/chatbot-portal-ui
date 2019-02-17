import { Button } from './button.model';

export interface Element {
  image_url: string;
  title: string;
  subtitle: string;
  buttons: Button[];
}

import type { Image } from 'src/models/Image';
import type { User } from 'src/models/User';

export interface Worksheet {
  id: number;
  title: string;
  description: string;
  price: number;
  cover?: Image;
  file?: File;
  creator?: User;
}

import type { Image } from 'src/models/Image';
import type { User } from 'src/models/User';

export interface Conference {
  id: number;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  price: number;
  cover?: Image;
  creator?: User;
}

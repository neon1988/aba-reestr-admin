import type { Image } from 'src/models/Image';
import type { User } from 'src/models/User';

export interface Webinar {
  id: number;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  record_file_id: number;
  subscribers_count: number;
  cover?: Image;
  record_file?: File;
  subscribers: User[];
}

import type { User } from 'src/models/User';
import type { File } from 'src/models/File';

export interface Webinar {
  id: number;
  title: string;
  description: string;
  start_at: string;
  end_at: string;
  stream_url: string;
  price: number;
  record_file_id: number;
  subscribers_count: number;
  cover?: File;
  record_file?: File;
  subscribers: User[];
  creator?: User;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

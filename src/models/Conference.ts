import type { User } from 'src/models/User';
import type { File } from 'src/models/File';

export interface Conference {
  id: number;
  title: string;
  description: string;
  registration_url: string;
  start_at: string;
  end_at: string;
  price: number;
  cover?: File;
  creator?: User;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

import type { User } from 'src/models/User';
import type { File } from 'src/models/File';

export interface Worksheet {
  id: number;
  title: string;
  description: string;
  price: number;
  cover?: File;
  file?: File[];
  creator?: User[];
}

// src/models/User.ts
import type { Image } from 'src/models/Image';

export interface User {
  id: number;
  email: string;
  name: string;
  photo?: Image;
}

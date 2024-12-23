// src/models/Specialist.ts
import type { File } from 'src/models/File';

export interface Specialist {
  id: number;
  lastname: string;
  firstname: string;
  middlename?: string;
  country: string;
  region?: string;
  city: string;
  education: string;
  phone: string;
  center_id?: number;
  is_available: boolean;
  photo_id?: number;
  create_user_id: number;
  status?: number;
  status_changed_at?: string;
  status_changed_user_id?: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  photo?: File;
  files?: File[];
}

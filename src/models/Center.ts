// src/models/Center.ts
export interface Center {
  id: number;
  name: string;
  legal_name: string;
  inn: string;
  kpp: string | null;
  country: string;
  region: string | null;
  city: string;
  phone: string;
  services: string | null;
  intensives: string | null;
  photo_id: number | null;
  status: number | null;
  status_changed_at: string | null;
  status_changed_user_id: number | null;
  create_user_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

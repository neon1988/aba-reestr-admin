// models/UploadedFile.ts
export interface UploadedFile {
  path: string;
  url: string;
  hash: string;
  message: string;
  isImage: boolean;
  mimeType: string;
  name: string;
  storage: string;
  temp: boolean;
}

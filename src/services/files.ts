import api from 'src/services/api';
import type { AxiosProgressEvent } from 'axios';

export const createFile = (
  file: File,
  onProgress: (progressEvent: AxiosProgressEvent) => void,
  signal: AbortSignal,
) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post(
    '/files',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 30 * 60 * 1000,
      onUploadProgress: onProgress,
      signal,
    },
  );
};

import api from 'src/services/api';

export const createFile = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post(
    '/files',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

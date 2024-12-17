import api from 'src/services/api';

export const createImage = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post(
    '/images',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

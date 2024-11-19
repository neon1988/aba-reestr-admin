import { ref } from 'vue';

export default function useValidationNotification(data : {'message': string, 'errors': object}) {
  let html = '';

  Object.entries(data.errors).forEach(([, value]) => {
    html += `<li>${value}</li>`;
  });

  const opts = ref<object>({
    color: 'red',
    textColor: 'white',
    icon: 'error',
    message: `<ul class="q-ma-none q-pa-sm">${html}</ul>`,
    caption: data.message,
    html: true,
  });

  return { opts };
}

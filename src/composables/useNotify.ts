import { Notify } from 'quasar';

export const useNotify = (message: string, type: 'success' | 'negative' | 'info' = 'info') => {
  Notify.create({
    message,
    color: type === 'success' ? 'green' : type === 'negative' ? 'red' : 'blue',
    timeout: 3000, // Время, через которое уведомление исчезнет
    actions: [
      {
        label: 'Закрыть',
        color: 'white',
      },
    ],
  });
};

export interface Link {
  url: string | null; // URL для перехода (null для недоступных ссылок)
  label: string; // Метка страницы (например, «1» или «Вперед»)
  active: boolean; // Указывает, является ли ссылка активной
}

export interface Meta {
  current_page: number; // Текущая страница
  from: number | null; // Первый элемент на текущей странице
  last_page: number; // Последняя страница
  links: Link[]; // Ссылки на страницы
  path: string; // URL базового пути
  per_page: number; // Количество элементов на странице
  to: number | null; // Последний элемент на текущей странице
  total: number; // Общее количество элементов
}

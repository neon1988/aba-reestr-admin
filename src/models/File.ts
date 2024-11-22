// models/File.ts
export interface File {
  id: number;
  storage: string;
  dirname: string; // Путь к файлу
  name: string; // Оригинальное имя файла
  extension: string; // Расширение файла (максимум 10 символов)
  size: number; // Размер файла в байтах
  create_user_id: number; // ID пользователя, создавшего файл
  created_at: string; // Дата и время создания записи
  updated_at: string; // Дата и время последнего обновления
  deleted_at: string | null; // Дата и время мягкого удаления (если файл удалён)
  url: string; // Ссылка на скачку файла
}

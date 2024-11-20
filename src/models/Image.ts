export interface Image {
  id: number;
  storage: string;
  dirname: string;
  name: string;
  width: number;
  height: number;
  size: number;
  type: string;
  create_user_id: number;
  created_at: string; // Можно использовать Date, если нужно работать с датой как с объектом
  updated_at: string; // Можно использовать Date, если нужно работать с датой как с объектом
  deleted_at: string | null; // Если поле может быть null, то указываем это
  url: string;
}

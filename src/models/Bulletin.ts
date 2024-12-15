// models/Bulletin.ts
import type { User } from 'src/models/User';
import type { StatusEnum } from 'src/enums/StatusEnums';

export interface Bulletin {
  id: number;
  text: string;
  create_user_id: number; // ID пользователя, создавшего файл
  created_at: string; // Дата и время создания записи
  updated_at: string; // Дата и время последнего обновления
  deleted_at: string | null; // Дата и время мягкого удаления (если файл удалён)
  status: StatusEnum;
  creator: User;
}

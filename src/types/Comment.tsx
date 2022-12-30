import { CurrentUser } from './User';

interface Comment {
  comment_id: number;
  content: string;
  user: CurrentUser;
}

interface CommentCreate {
  comment_id: number;
  content: string;
  created_dt: number;
}

interface CommentFetched extends Comment {
  created_dt: number;
}

interface CommentShow extends Comment {
  created_dt: string;
}

export type { CommentShow, CommentCreate, CommentFetched };

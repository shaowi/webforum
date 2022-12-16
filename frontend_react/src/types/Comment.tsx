import { Author } from './User';

interface CommentCardProps {
  comment_id: number;
  posted_on: string;
  content: string;
  author: Author;
}

export type { CommentCardProps };

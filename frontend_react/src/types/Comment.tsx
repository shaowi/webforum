import { User } from './User';

interface Comment {
  posted_on: string;
  body: string;
  author: User;
}

export type { Comment };

import { User } from './User';

interface PostCardProps {
  post_id: number;
  title: string;
  body: string;
  likes: number;
  views: number;
  comments: number;
  category: string;
  author: User;
  description: string;
}

interface NewPost {
  title: string;
  body: string;
  category: Array<string>;
}

export type { PostCardProps, NewPost };

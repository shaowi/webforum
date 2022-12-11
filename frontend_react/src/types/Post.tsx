import { User } from './User';

interface PostCardProps {
  post_id: number;
  title: string;
  body: string;
  likes: number;
  views: number;
  comments: number;
  category: string;
  author: {
    user_info: User;
    description: string;
  };
}

export type { PostCardProps };

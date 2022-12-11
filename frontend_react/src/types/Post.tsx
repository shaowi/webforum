import { User } from './User';

interface PostCardProps {
  post_id: number;
  title: string;
  likes: number;
  views: number;
  comments: number;
  image: string;
  category: string;
  author: {
    user_info: User;
    description: string;
  };
}

export type { PostCardProps };

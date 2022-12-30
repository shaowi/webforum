import { CurrentUser } from './User';

interface Post {
  title: string;
  body: string;
}

interface NewPost extends Post {
  category: Array<string>;
}

interface PostCard extends Post {
  post_id: number;
  likes: number;
  views: number;
  comments: number;
  user: CurrentUser;
}

interface PostFetched extends PostCard {
  categories: string;
  created_dt: number;
}

interface PostCardProps extends PostCard {
  categories: Array<string>;
  description: string;
}

interface PostCreate extends Post {
  user_id: string;
  categories: string;
  author_name: string;
  author_email: string;
}

export type { PostFetched, PostCardProps, NewPost, PostCreate };

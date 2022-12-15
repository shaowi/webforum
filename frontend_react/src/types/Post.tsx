interface PostCardProps {
  post_id: number;
  title: string;
  body: string;
  likes: number;
  views: number;
  comments: number;
  categories: Array<string>;
  author_name: string;
  author_email: string;
  description: string;
}

interface NewPost {
  title: string;
  body: string;
  category: Array<string>;
}

export type { PostCardProps, NewPost };

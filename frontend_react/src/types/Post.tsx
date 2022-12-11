interface PostCardProps {
  image: string;
  category: string;
  title: string;
  likes: number;
  views: number;
  comments: number;
  author: {
    name: string;
    description: string;
    image: string;
  };
}

export type { PostCardProps };

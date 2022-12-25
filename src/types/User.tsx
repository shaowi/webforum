interface User {
  user_id: number;
  email: string;
  name: string;
  access_type: number;
  avatar_color: string;
}

interface UserCardImageProps {
  user: User;
  stats: { label: string; value: string }[];
}

interface Author {
  user_id: number;
  name: string;
  email: string;
  avatar_color: string;
}

export type { User, UserCardImageProps, Author };

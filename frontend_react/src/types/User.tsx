interface User {
  user_id: number;
  email: string;
  name: string;
  access_type: number;
  avatarColor: string;
}

interface UserCardImageProps {
  user: User;
  stats: { label: string; value: string }[];
}

export type { User, UserCardImageProps };

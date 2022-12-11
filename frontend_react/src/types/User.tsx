interface User {
  user_id: number;
  email: string;
  name: string;
  access_type: number;
}

interface UserCardImageProps {
  image: string;
  avatar: string;
  name: string;
  job: string;
  stats: { label: string; value: string }[];
}

export type { User, UserCardImageProps };

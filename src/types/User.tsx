interface CurrentUser {
  user_id: number;
  email: string;
  name: string;
  access_type: number;
  avatar_color: string;
}

interface UserSignIn {
  email: string;
  password: string;
}

interface UserSignUp extends UserSignIn {
  name: string;
  access_type: string;
  avatar_color: string;
}

interface UserCardImageProps {
  user: CurrentUser;
  stats: { label: string; value: string }[];
}

interface Author {
  user_id: number;
  name: string;
  email: string;
  avatar_color: string;
}

interface Token {
  jwt_token: string;
}

interface UserStats {
  views: string;
  likes: string;
  mades: string;
}

export type {
  CurrentUser,
  UserStats,
  UserSignIn,
  UserSignUp,
  UserCardImageProps,
  Author,
  Token
};

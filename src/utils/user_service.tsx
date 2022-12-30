import { PostCardProps } from '../types/Post';
import { Token, UserSignIn, UserSignUp } from '../types/User';
import { API_HOST_POPULARITY, API_HOST_USER } from './constants';
import { getRequest, postRequest } from './request_service';

async function getCacheUser(token: Token): Promise<unknown> {
  const res = await postRequest(API_HOST_USER, token);
  return res.json();
}

async function getUserStats(token: Token): Promise<unknown> {
  const res = await postRequest(`${API_HOST_USER}/userstats`, token);
  return res.json();
}

async function getUserStatsForAPost(
  post_id: number,
  user_id: number
): Promise<unknown> {
  const res = await getRequest(`${API_HOST_POPULARITY}/${post_id}/${user_id}`);
  return res.json();
}

async function signIn(user: UserSignIn): Promise<unknown> {
  const response = await postRequest(`${API_HOST_USER}/login`, user);
  return response.json();
}

async function signUp(newUser: UserSignUp): Promise<unknown> {
  const response = await postRequest(`${API_HOST_USER}/register`, newUser);
  return response.json();
}

async function resetPassword(data: { email: string }): Promise<unknown> {
  const response = await postRequest(`${API_HOST_USER}/resetpassword`, data);
  return response.json();
}

async function changePassword(user: UserSignIn): Promise<unknown> {
  const response = await postRequest(`${API_HOST_USER}/changepassword`, user);
  return response.json();
}

async function changeName(data: {
  email: string;
  name: string;
}): Promise<unknown> {
  const response = await postRequest(`${API_HOST_USER}/changename`, data);
  return response.json();
}

function accountLikes(
  posts: PostCardProps[],
  id: number,
  like: boolean
): PostCardProps[] {
  return posts.map((p) => {
    if (p.post_id === id) {
      p.likes = like ? p.likes + 1 : p.likes === 0 ? p.likes : p.likes - 1;
    }
    return p;
  });
}

export {
  signIn,
  signUp,
  resetPassword,
  changePassword,
  changeName,
  getCacheUser,
  getUserStats,
  getUserStatsForAPost,
  accountLikes
};

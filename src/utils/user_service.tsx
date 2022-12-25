import { PostCardProps } from '../types/Post';
import { API_HOST_POPULARITY, API_HOST_USER } from './constants';
import { getRequest, postRequest } from './request_service';

async function getCacheUser(token: any): Promise<any> {
  const res = await postRequest(API_HOST_USER, token);
  return res.json();
}

async function getUserStats(token: any): Promise<any> {
  const res = await postRequest(`${API_HOST_USER}/userstats`, token);
  return res.json();
}

async function getUserStatsForAPost(
  post_id: number,
  user_id: number
): Promise<any> {
  const res = await getRequest(`${API_HOST_POPULARITY}/${post_id}/${user_id}`);
  return res.json();
}

async function signIn(userInfo: {
  email: string;
  password: string;
}): Promise<any> {
  const response = await postRequest(`${API_HOST_USER}/login`, userInfo);
  return response.json();
}

async function signUp(newUser: {
  email: string;
  password: string;
  name: string;
  access_type: string;
  avatar_color: string;
}): Promise<any> {
  const response = await postRequest(`${API_HOST_USER}/register`, newUser);
  return response.json();
}

async function resetPassword(data: { email: string }): Promise<any> {
  const response = await postRequest(`${API_HOST_USER}/resetpassword`, data);
  return response.json();
}

async function changePassword(data: {
  email: string;
  password: string;
}): Promise<any> {
  const response = await postRequest(`${API_HOST_USER}/changepassword`, data);
  return response.json();
}

async function changeName(data: { email: string; name: string }): Promise<any> {
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

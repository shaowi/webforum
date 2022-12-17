import { PostCardProps } from '../types/Post';
import { API_HOST_POPULARITY, API_HOST_USER } from './constants';
import { getRequest, postRequest } from './request_service';

async function getCacheUser(): Promise<any> {
  const res = await getRequest(API_HOST_USER);
  return res.json();
}

async function getUserStats(): Promise<any> {
  const res = await getRequest(`${API_HOST_USER}/userstats`);
  return res.json();
}

async function getUserStatsForAPost(post_id: number): Promise<any> {
  const res = await getRequest(`${API_HOST_POPULARITY}/${post_id}`);
  return res.json();
}

async function getUserById(id: number): Promise<any> {
  const res = await getRequest(`${API_HOST_USER}/${id}`);
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
      p.likes = like ? p.likes + 1 : p.likes - 1;
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
  getUserById,
  accountLikes
};

import { API_HOST_USER } from './constants';
import { getRequest, postRequest } from './request_service';

async function getCacheUser(): Promise<any> {
  const res = await getRequest(API_HOST_USER);
  return res.json();
}

async function getUserStats(): Promise<any> {
  const res = await getRequest(`${API_HOST_USER}/userstats`);
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

export {
  signIn,
  signUp,
  resetPassword,
  changePassword,
  changeName,
  getCacheUser,
  getUserStats,
  getUserById
};

import { postRequest } from './request_service';
import { API_HOST_POST } from './constants';

async function createPost(data: any) {
  const response = await postRequest(`${API_HOST_POST}/add`, data);
  return response.json();
}

async function deletePost(id: number) {
  const response = await postRequest(`${API_HOST_POST}/delete/${id}`, {});
  return response.json();
}

export { createPost, deletePost };

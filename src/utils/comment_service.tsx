import { CommentFetched, CommentShow } from '../types/Comment';
import { API_HOST_COMMENT } from './constants';
import { convertUnixTSToDT } from './post_service';
import { getRequest, postRequest } from './request_service';

async function getComments(post_id: number): Promise<unknown> {
  const url = API_HOST_COMMENT(post_id);
  const response = await getRequest(url);
  return response.json();
}

async function createComment(
  post_id: number,
  data: { user_id: string; content: string }
): Promise<unknown> {
  const url = `${API_HOST_COMMENT(post_id)}/add`;
  const response = await postRequest(url, data);
  return response.json();
}

async function removeComment(
  post_id: number,
  comment_id: number
): Promise<unknown> {
  const url = `${API_HOST_COMMENT(post_id)}/delete/${comment_id}`;
  const response = await postRequest(url, {});
  return response.json();
}

function convertToCommentCard(data: CommentFetched): CommentShow {
  const { comment_id, created_dt, content, user } = data;
  return {
    created_dt: convertUnixTSToDT(created_dt),
    comment_id,
    content,
    user
  };
}

export { getComments, createComment, removeComment, convertToCommentCard };

import { CommentCardProps } from '../types/Comment';
import { CurrentUser } from '../types/User';
import { API_HOST_COMMENT } from './constants';
import { convertUnixTSToDT } from './post_service';
import { getRequest, postRequest } from './request_service';

async function getComments(post_id: number) {
  const url = API_HOST_COMMENT(post_id);
  const response = await getRequest(url);
  return response.json();
}

async function createComment(post_id: number, data: any) {
  const url = `${API_HOST_COMMENT(post_id)}/add`;
  const response = await postRequest(url, data);
  return response.json();
}

async function removeComment(post_id: number, comment_id: number) {
  const url = `${API_HOST_COMMENT(post_id)}/delete/${comment_id}`;
  const response = await postRequest(url, {});
  return response.json();
}

function convertToCommentCard({
  comment_id,
  created_dt,
  content,
  user
}: {
  comment_id: number;
  created_dt: number;
  content: string;
  user: CurrentUser;
}): CommentCardProps {
  return {
    posted_on: convertUnixTSToDT(created_dt),
    comment_id,
    content,
    author: {
      user_id: user.user_id,
      name: user.name,
      email: user.email,
      avatar_color: user.avatar_color
    }
  };
}

export { getComments, createComment, removeComment, convertToCommentCard };

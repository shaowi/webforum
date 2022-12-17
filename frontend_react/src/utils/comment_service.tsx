import { getRequest, postRequest } from './request_service';
import { API_HOST_COMMENT, getRandomColors } from './constants';
import { convertUnixTSToDT } from './post_service';
import { CommentCardProps } from '../types/Comment';

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
  author_name,
  author_email
}: {
  comment_id: number;
  created_dt: number;
  content: string;
  author_name: string;
  author_email: string;
}): CommentCardProps {
  return {
    posted_on: convertUnixTSToDT(created_dt),
    comment_id,
    content,
    author: {
      name: author_name,
      email: author_email,
      avatarColor: getRandomColors()
    }
  };
}

export { getComments, createComment, removeComment, convertToCommentCard };
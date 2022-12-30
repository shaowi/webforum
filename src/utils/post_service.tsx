import { PostCardProps, PostCreate, PostFetched } from '../types/Post';
import { API_HOST_POST, API_HOST_POST_HISTORY } from './constants';
import { getRequest, postRequest } from './request_service';

async function getAllPosts(): Promise<unknown> {
  const response = await getRequest(API_HOST_POST);
  return response.json();
}

async function getViewedPosts(userId: number): Promise<unknown> {
  const response = await getRequest(`${API_HOST_POST_HISTORY}/view/${userId}`);
  return response.json();
}

async function getLikedPosts(userId: number): Promise<unknown> {
  const response = await getRequest(`${API_HOST_POST_HISTORY}/like/${userId}`);
  return response.json();
}

async function getCommentedPosts(userId: number): Promise<unknown> {
  const response = await getRequest(
    `${API_HOST_POST_HISTORY}/comment/${userId}`
  );
  return response.json();
}

async function createPost(data: PostCreate): Promise<unknown> {
  const response = await postRequest(`${API_HOST_POST}/add`, data);
  return response.json();
}

async function removePost(id: number): Promise<unknown> {
  const response = await postRequest(`${API_HOST_POST}/delete/${id}`, {});
  return response.json();
}

async function likePost(
  id: number,
  data: { like: string; user_id: string }
): Promise<unknown> {
  const response = await postRequest(`${API_HOST_POST}/like/${id}`, data);
  return response.json();
}

async function viewPost(
  id: number,
  data: { user_id: string }
): Promise<unknown> {
  const response = await postRequest(`${API_HOST_POST}/view/${id}`, data);
  return response.json();
}

function convertUnixTSToDT(UNIX_timestamp: number) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  const padZero = (n: number): unknown => (n < 10 ? `0${n}` : n);
  return `${date} ${month} ${year}, ${padZero(hour)}:${padZero(min)}`;
}

function isSubset(a1: string[], a2: string[]) {
  const set2 = new Set(a2);
  for (let i of a1) {
    if (!set2.has(i)) return false;
  }
  return true;
}

function convertToPostCard(data: PostFetched): PostCardProps {
  const {
    post_id,
    title,
    categories,
    body,
    likes,
    views,
    comments,
    created_dt,
    user
  } = data;
  return {
    post_id,
    title,
    categories: categories.toLowerCase().split(','),
    body,
    likes,
    views,
    comments,
    description: `Posted on ${convertUnixTSToDT(created_dt)}`,
    user
  };
}

function incrementPostView(
  posts: PostCardProps[],
  post_id: number
): PostCardProps[] {
  return posts.map((p) => {
    if (p.post_id === post_id) {
      p.views++;
    }
    return p;
  });
}

function incrDecrPostComments(
  posts: PostCardProps[],
  post_id: number,
  type: number // Increment - 1, Decrement - 0
): PostCardProps[] {
  return posts.map((p) => {
    if (p.post_id === post_id) {
      p.comments =
        type === 1
          ? p.comments + 1
          : p.comments === 0
          ? p.comments
          : p.comments - 1;
    }
    return p;
  });
}

export {
  createPost,
  removePost,
  getAllPosts,
  likePost,
  viewPost,
  convertUnixTSToDT,
  isSubset,
  convertToPostCard,
  incrementPostView,
  incrDecrPostComments,
  getViewedPosts,
  getLikedPosts,
  getCommentedPosts
};

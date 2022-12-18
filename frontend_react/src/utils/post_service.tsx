import { PostCardProps } from '../types/Post';
import { API_HOST_POST, API_HOST_POST_HISTORY } from './constants';
import { getRequest, postRequest } from './request_service';

async function getAllPosts() {
  const response = await getRequest(API_HOST_POST);
  return response.json();
}

async function getViewedPosts() {
  const response = await getRequest(`${API_HOST_POST_HISTORY}/view`);
  return response.json();
}

async function getLikedPosts() {
  const response = await getRequest(`${API_HOST_POST_HISTORY}/like`);
  return response.json();
}

async function getCommentedPosts() {
  const response = await getRequest(`${API_HOST_POST_HISTORY}/comment`);
  return response.json();
}

async function createPost(data: any) {
  const response = await postRequest(`${API_HOST_POST}/add`, data);
  return response.json();
}

async function removePost(id: number) {
  const response = await postRequest(`${API_HOST_POST}/delete/${id}`, {});
  return response.json();
}

async function likePost(id: number, like: string) {
  const response = await postRequest(`${API_HOST_POST}/like/${id}`, { like });
  return response.json();
}

async function viewPost(id: number) {
  const response = await postRequest(`${API_HOST_POST}/view/${id}`, {});
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
  return `${date} ${month} ${year}, ${hour}:${min}`;
}

function isSubset(a1: any, a2: any) {
  const set2 = new Set(a2);
  for (let i of a1) {
    if (!set2.has(i)) return false;
  }
  return true;
}

function convertToPostCard(d: any) {
  return {
    post_id: d.post_id,
    title: d.title,
    categories: d.categories.toLowerCase().split(','),
    body: d.body,
    likes: d.likes,
    views: d.views,
    comments: d.comments,
    description: `Posted on ${convertUnixTSToDT(d.created_dt)}`,
    author: {
      name: d.user.name,
      email: d.user.email,
      avatar_color: d.avatar_color
    }
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
  isSubset as hasOverlap,
  convertToPostCard,
  incrementPostView,
  incrDecrPostComments,
  getViewedPosts,
  getLikedPosts,
  getCommentedPosts
};

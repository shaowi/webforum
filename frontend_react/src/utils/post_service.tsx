import { getRequest, postRequest } from './request_service';
import { API_HOST_POST } from './constants';

async function getAllPosts() {
  const response = await getRequest(API_HOST_POST);
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
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
  return time;
}

function hasOverlap(a1: any, a2: any) {
  const set1 = new Set(a1);
  for (let i of a2) {
    if (set1.has(i)) return true;
  }
  return false;
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
    author_name: d.author_name,
    author_email: d.author_email
  };
}

export {
  createPost,
  removePost,
  getAllPosts,
  convertUnixTSToDT,
  hasOverlap,
  convertToPostCard
};

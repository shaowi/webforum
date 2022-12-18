export const API_HOST = 'http://localhost:3000/api';
export const API_HOST_USER = `${API_HOST}/user`;
export const API_HOST_POST = `${API_HOST}/post`;
export const API_HOST_POST_HISTORY = `${API_HOST}/history`;
export const API_HOST_COMMENT = (postId: number) =>
  `${API_HOST_POST}/${postId}/comment`;
export const API_HOST_POPULARITY = `${API_HOST}/popularity`;

export function getRandomColors() {
  const colors = [
    'dark',
    'red',
    'pink',
    'grape',
    'violet',
    'indigo',
    'blue',
    'cyan',
    'teal',
    'green',
    'lime',
    'yellow',
    'orange'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function getNameInitials(name: string) {
  return name
    .split(' ')
    .map((s) => s[0])
    .join('')
    .toUpperCase();
}

export function lowerCaseStrArrays(arr: Array<string>) {
  return arr.map((s) => s.toLowerCase());
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

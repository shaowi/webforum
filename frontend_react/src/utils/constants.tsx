export const API_HOST = 'http://localhost:3000/api/';

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
    'orange',
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

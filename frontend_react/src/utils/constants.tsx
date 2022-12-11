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

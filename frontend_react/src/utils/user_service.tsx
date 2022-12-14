import { API_HOST_USER } from './constants';

async function signIn({
  email,
  password
}: {
  email: string;
  password: string;
}): Promise<any> {
  const url = `${API_HOST_USER}/login`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email,
      password
    })
  });
  return response.json();
}

async function signUp(newUser: any): Promise<any> {
  const url = `${API_HOST_USER}/register`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(newUser)
  });
  return response.json();
}

async function resetPassword(email: string): Promise<any> {
  const url = `${API_HOST_USER}/resetpassword`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      email
    })
  });

  return response.json();
}

export { signIn, signUp, resetPassword };

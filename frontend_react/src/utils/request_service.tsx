async function getRequest(url: string) {
  return await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  });
}

async function postRequest(url: string, data: any) {
  return await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(data)
  });
}

export { getRequest, postRequest };

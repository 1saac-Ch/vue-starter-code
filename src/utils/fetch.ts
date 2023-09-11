const baseURL = import.meta.env.VITE_API_BASE_URL

export async function _fetch(url: string, options: RequestInit) {
  return fetch(`${baseURL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
}

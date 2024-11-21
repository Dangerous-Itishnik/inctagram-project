const STORAGE_KEY = {
  token: 'accessToken',
}

export const STORAGE = {
  deleteToken: () => localStorage.removeItem(STORAGE_KEY.token),
  getToken: () => localStorage.getItem(STORAGE_KEY.token),
  setToken: (token: string) => localStorage.setItem(STORAGE_KEY.token, token),
}

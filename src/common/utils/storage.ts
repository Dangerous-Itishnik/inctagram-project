const storageKey = {
  token: 'accessToken',
}

export const storage = {
  deleteToken: () => localStorage.removeItem(storageKey.token),
  getToken: () => localStorage.getItem(storageKey.token),
  setToken: (token: string) => localStorage.setItem(storageKey.token, token),
}

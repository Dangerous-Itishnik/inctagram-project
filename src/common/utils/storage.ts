const storageKey = {
  token: 'accessToken',
}

export const storage = {
  deleteToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(storageKey.token)
    }
  },
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(storageKey.token)
    }

    return null
  },
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey.token, token)
    }
  },
}

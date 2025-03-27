// profile.service.ts

export type Avatar = {
  fileSize: number
  height: number
  url: string
  width: number
}

export type Profile = {
  aboutMe: string
  avatars: Avatar[]
  city: string
  country: string
  createdAt: string
  dateOfBirth: string
  firstName: string
  id: number
  lastName: string
  userName: string
}

export type ProfilePut = Omit<Partial<Profile>, 'avatars' | 'createdAt' | 'id'>

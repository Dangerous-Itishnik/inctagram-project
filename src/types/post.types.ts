import { number } from "prop-types";

export type ImagesAllUrl = Record<number,string[]>


export type Response = {
  images: ResponseImages[]
  description?: string
}
export type ResponseImages = {
  id: number
  createdAt?: string
  fileSize?: number
  height?: number
  uploadId: number
  url: string
  width?: number
}

export type Owner = {
  firstName: string
  lastName: string
}

export type PostData = {
  id: number
  ownerId: number
  userName: string
  description: string
  images: ResponseImages[]
  owner: Owner
  avatarOwner: string
  updatedAt: string
  createdAt: string
}
export type PostItem = {
  id: number,
  ownerId: number,
  userName: string,
  description: string,
  location: string,
  images: ResponseImages[],
  createdAt: string,
  updatedAt: string,
  avatarOwner: string,
  owner: {
    firstName: string,
    lastName: string,
  }
}
export type PostsAllData = {
  totalCount: number,
  pageSize: number,
  items: PostItem[],
  totalUsers: number
}


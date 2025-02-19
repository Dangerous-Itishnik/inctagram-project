export type PostImageResponse = {
  images: ResponseImages[]
}
export type ResponseImages = {
  createdAt: string
  fileSize: number
  height: number
  id: number
  uploadId: string
  url: string
  width: number
}

export type PostsResponse = {
  items: Post[]
  notReadCount: number
  pageSize: number
  totalCount: number
}
export type ItemsImages = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
export type ItemsOwner = {
  firstName: string
  lastName: string
}
export type Post = {
  avatarOwner: string
  avatarWhoLikes: boolean
  createdAt: string
  description: string
  id: number
  images: ItemsImages[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: ItemsOwner
  ownerId: number
  updatedAt: string
  userName: string
}

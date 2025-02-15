export type PostImageResponse = {
  images: ResponseImages[]
}
export type ResponseImages = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}

export type PostsResponse = {
  avatarOwner: string
  avatarWhoLikes: boolean
  createdAt: string
  description: string
  id: number
  images: PostsResponseImages[]
  isLiked: boolean
  likesCount: number
  location: string
  owner: PostsResponseOwner
  ownerId: number
  updatedAt: string
  userName: string
}
export type PostsResponseImages = {
  createdAt: string
  fileSize: number
  height: number
  uploadId: string
  url: string
  width: number
}
export type PostsResponseOwner = {
  firstName: string
  lastName: string
}

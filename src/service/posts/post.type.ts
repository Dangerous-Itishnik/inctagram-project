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
type Avatar = {
  createdAt: string
  fileSize: number
  height: number
  url: string
  width: number
}
type Item = {
  avatars: Avatar[]
  createdAt: string
  id: number
  isFollowedBy: boolean
  isFollowing: boolean
  userId: number
  userName: string
}
export type PostLikesResponse = {
  items: Item[]
  notReadCount: number
  pageSize: number
  totalCount: number
}

export type GetPostLikesParams = {
  cursor?: number
  pageNumber?: number
  pageSize?: number
  postId: number
  search?: string
}

export type PostResponse = {
  items: Post[]
  notReadCount?: number
  pageSize: number
  totalCount: number
}

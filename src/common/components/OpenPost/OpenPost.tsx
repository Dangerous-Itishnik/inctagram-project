'use client'
import { ReactNode } from 'react'

import { PostContentQueryModal } from '@/features/posts/ui/postModalContent/PostContentQueryModal'
import { usePathname } from '@/i18n/navigation'
import { Post } from '@/service/posts/post.type'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLocale } from 'next-intl'

type Props = {
  children: ReactNode
  post: Post
}

export const OpenPost = ({ children, post }: Props) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const postId = searchParams.get('postId')
  const locale = useLocale()

  const openPost = () => {
    const newParams = new URLSearchParams(searchParams.toString())

    newParams.set('postId', post.id.toString())

    const localizedProfilePath = `/${locale}/profile/${post.ownerId}`
    const isProfilePage = pathname.startsWith(`/${locale}/profile`)

    router.push(`${isProfilePage ? pathname : localizedProfilePath}?${newParams.toString()}`, {
      scroll: false,
    })
  }

  return (
    <>
      <div key={post.id} onClick={openPost}>
        {children}
      </div>
      {postId && <PostContentQueryModal postId={+postId} />}
    </>
  )
}

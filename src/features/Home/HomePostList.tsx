import { useCallback, useEffect, useRef, useState } from 'react'

import BookmarkOutline from '@/assets/icons/components/BookmarkOutline'
import MessageCircleOutline from '@/assets/icons/components/MessageCircleOutline'
import PaperPlaneOutline from '@/assets/icons/components/PaperPlaneOutline'
import LikeButton from '@/common/components/LikeButton'
import PublishButton from '@/common/components/PublishButton/PublishButton'
import { SwiperSlider } from '@/common/components/Swiper/SwiperSlider'
import { Button } from '@/common/components/button'
import HomeDropDown from '@/features/Home/HomeDropDown'
import Comments from '@/features/posts/ui/postModalContent/Comments/Comments'
import { ItemHome, useHomePageQuery } from '@/service/user/user.servise'
import { formatDistance } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'

import styles from './homePostList.module.scss'

import { useObserver } from '../posts/ui/useObserver'

const HomePostList = () => {
  const [allPosts, setAllPosts] = useState<ItemHome[]>([])
  const [pageNumber, setPageNumber] = useState(1)
  const [expandedComments, setExpandedComments] = useState<Set<number>>(new Set())
  const listRef = useRef(null)
  const { data, isFetching, refetch } = useHomePageQuery({
    pageNumber: 1,
    pageSize: 12,
  })

  useEffect(() => {
    if (data) {
      if (pageNumber === 1) {
        setAllPosts(data?.items)
      } else {
        // eslint-disable-next-line no-unsafe-optional-chaining
        setAllPosts(prev => [...prev, ...data?.items])
      }
    }
  }, [data, pageNumber])

  const handleLoadMore = useCallback(() => {
    if (!isFetching) {
      setPageNumber(prev => prev + 1)
    }
  }, [isFetching])

  useObserver(listRef, allPosts, {
    onLoadMore: handleLoadMore,
    threshold: 0.1,
  })

  const toggleComments = (postId: number) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev)

      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }

      return newSet
    })
  }

  return (
    <div className={styles.postsContainer}>
      {allPosts.map(user => (
        <div className={styles.postItem} data-id={user.id} key={user.id} ref={listRef}>
          <header className={styles.postHeader}>
            <div className={styles.avatarWrapper}>
              <Image
                alt={'avatar'}
                height={36}
                priority
                sizes={'22vw'}
                src={user.avatarOwner}
                style={{ borderRadius: '50%' }}
                width={36}
              />
            </div>
            <Link className={styles.userName} href={`/profile/${user.id}`}>
              {user.userName}
            </Link>
            <span className={styles.postTime}>
              {formatDistance(new Date(user.createdAt), new Date(), { addSuffix: true })} .
            </span>
            <div className={styles.dropdownWrapper}>
              <HomeDropDown id={user.id} />
            </div>
          </header>

          <div className={styles.mediaContainer}>
            <SwiperSlider imagesUrl={user.images} />
          </div>

          <div className={styles.interactionContainer}>
            <LikeButton isLiked={user.isLiked} postId={user.id} refetch={refetch} />
            <MessageCircleOutline />
            <PaperPlaneOutline />
            <BookmarkOutline className={styles.bookmark} />
          </div>
          <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
            <div className={styles.avatarWrapper}>
              <Image
                alt={'avatar'}
                height={36}
                priority
                sizes={'22vw'}
                src={user.avatarOwner}
                style={{ borderRadius: '50%' }}
                width={36}
              />
            </div>
            <div>
              <Link href={`/profile/${user.id}`}>{user.userName}</Link>
              <span>{user.description}</span>
            </div>
          </div>
          <div>
            <div className={styles.whoLikes}>
              {data?.items
                ?.filter(item => item.id === user.id)
                ?.flatMap(item => item.avatarWhoLikes || [])
                ?.slice(-3)
                .map((url, index) => (
                  <div className={styles.avatarsLike} key={index}>
                    <Image
                      alt={'avatar'}
                      height={36}
                      key={index}
                      priority
                      sizes={'22vw'}
                      src={url}
                      style={{ borderRadius: '50%' }}
                      width={36}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div>
            <Button className={styles.viewCommentsButton} onClick={() => toggleComments(user.id)}>
              {expandedComments.has(user.id) ? 'Hide comments' : 'View all comments...'}
            </Button>

            {expandedComments.has(user.id) && (
              <div className={styles.commentsSection}>
                <Comments postId={user.id} />
              </div>
            )}
          </div>
          <PublishButton postId={user.id} />
        </div>
      ))}
    </div>
  )
}

export default HomePostList

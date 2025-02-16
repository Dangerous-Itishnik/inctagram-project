'use client'
import { useGetPostQuery } from '@/service/posts/posts.service'
import * as Dialog from '@radix-ui/react-dialog'
import { useRouter, useSearchParams } from 'next/navigation'

import styles from '@/common/components/Modals/RadixModal/RadixModal.module.scss'
type Props = {
  postId: number
}
export const OpenPostModal = ({ postId }: Props) => {
  const { data } = useGetPostQuery({ postId })
  const router = useRouter()
  const searchParams = useSearchParams()

  console.log(data.items)

  const closePost = () => {
    const newParams = new URLSearchParams(searchParams.toString()) // Клонируем текущие параметры

    newParams.delete('postId')
    router.push(`?${newParams.toString()}`, { scroll: false }) // Обновляем URL с новыми параметрами
  }

  return (
    <Dialog.Root open={!!postId}>
      <Dialog.Trigger asChild />
      <Dialog.Portal>
        <Dialog.Overlay className={styles.Overlay} />
        <Dialog.Content className={styles.Content}>
          <Dialog.Title asChild className={styles.title}></Dialog.Title>
          <Dialog.Description className={styles.Description}></Dialog.Description>
          <Dialog.Close>
            <button onClick={closePost}>X</button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

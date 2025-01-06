import styles from '@/features/posts/ui/createPost/closeNotification.module.scss'

export const CloseNotification = ({ onClose }) => {
  const handelCloseNotification = () => {
    onClose()
  }

  return (
    <div className={styles.notificationWindow}>
      <div className={styles.header}>
        <h1>Close</h1>
        <button onClick={handelCloseNotification} type={'button'}>
          {'X'}
        </button>
      </div>
      <div className={styles.message}>
        Do you really want to close the creation of a publication? If you close everything will be
        deleted
      </div>
      <div className={styles.buttons}>
        <button type={'button'}>Discard</button>
        <button type={'button'}>Save draft</button>
      </div>
    </div>
  )
}

import { SvgEdit2Outline } from '@/assets/icons/components/Edit2Outline'
import { SvgTrashOutline } from '@/assets/icons/components/TrashOutline'
import { Button } from '@/common/components/button'

import styles from '@/common/components/Modals/PostManagementModal/PostOptions/PostOptions.module.scss'

export const PostOptions = ({ deleteOption, updateOption }) => {
  return (
    <div className={styles.container}>
      <div className={styles.update}>
        <SvgEdit2Outline />
        <Button onClick={updateOption}>Edit Post</Button>
      </div>
      <div className={styles.delete}>
        <SvgTrashOutline />
        <Button onClick={deleteOption}>Delete Post</Button>
      </div>
    </div>
  )
}

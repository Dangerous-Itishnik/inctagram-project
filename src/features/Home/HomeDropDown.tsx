import Copy from '@/assets/icons/components/Copy'
import { Dropdown, DropdownItem } from '@/common/components/Dropdown'
import UnfollowButton from '@/common/components/UnfollowButton/UnfollowButton'
import { Button } from '@/common/components/button'

import styles from '@/features/posts/ui/postModalContent/PostModal.module.scss'

const HomeDropDown = ({
  context,
  id,
  userName,
}: {
  context?: () => void
  id: number
  userName: string
}) => {
  return (
    <div>
      <Dropdown align={'end'} trigger={<div className={styles.ellipse}>...</div>}>
        <DropdownItem>
          <UnfollowButton context={context} id={id} userName={userName} />
        </DropdownItem>
        <DropdownItem>
          <Button onClick={() => {}} variant={'link'}>
            <Copy />
            Copy Link
          </Button>
        </DropdownItem>
      </Dropdown>
    </div>
  )
}

export default HomeDropDown

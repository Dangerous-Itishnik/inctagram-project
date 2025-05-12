import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
import { RadixModal } from '@/common/components/Modals/RadixModal/RadixModal'
import { Button } from '@/common/components/button'

const meta = {
  component: RadixModal,
  tags: ['autodocs'],
  title: 'Components/RadixModal',
} satisfies Meta<typeof RadixModal>

export default meta
type Story = StoryObj<typeof meta>

export const BaseInfoModal: Story = {
  args: {
    children: 'Are you really want to log out of your account ?',
    modalTitle: 'Primary Button',
    onClose: () => {},
    open: false,
    setIsModalInfo: () => {},
  },
  render: args => {
    const [isActiveModal, setIsActiveModal] = useState<'info' | 'radix' | null>(null)

    return (
      <>
        <Button onClick={() => setIsActiveModal('radix')}>Open RadixModal</Button>
        <RadixModal
          {...args}
          modalTitle={'string'}
          onClose={() => setIsActiveModal(null)}
          open={isActiveModal === 'radix'}
          setIsModalInfo={() => setIsActiveModal('info')}
        >
          Content
        </RadixModal>
        <InfoModal
          {...args}
          modalTitle={'Warning'}
          onClose={() => setIsActiveModal('radix')}
          open={isActiveModal === 'info'}
        >
          <Button onClick={() => setIsActiveModal(null)}>Yes</Button>
          <Button onClick={() => setIsActiveModal('radix')}>No</Button>
        </InfoModal>
      </>
    )
  },
}

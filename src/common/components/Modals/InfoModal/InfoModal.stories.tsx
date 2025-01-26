import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { InfoModal } from '@/common/components/Modals/InfoModal/InfoModal'
import { Button } from '@/common/components/button'

const meta = {
  component: InfoModal,
  tags: ['autodocs'],
  title: 'Components/InfoModal',
} satisfies Meta<typeof InfoModal>

export default meta
type Story = StoryObj<typeof meta>

export const BaseInfoModal: Story = {
  args: {
    children: 'Are you really want to log out of your account ?',
    modalTitle: 'Primary Button',
  },
  render: args => {
    const [isActive, setIsActive] = useState(false)

    return (
      <>
        <Button onClick={() => setIsActive(!isActive)}>Open InfoModal</Button>
        <InfoModal {...args} onClose={() => setIsActive(false)} open={isActive} />
      </>
    )
  },
}

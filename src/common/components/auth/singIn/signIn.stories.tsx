import type { Meta, StoryObj } from '@storybook/react'

import SingIn, { SignInProps } from '@/common/components/auth/singIn/SingIn'

export default {
  argTypes: {
    onSubmit: { action: 'submitted' }, // отображение действия отправки в Storybook
  },
  component: SingIn,
  tags: ['autodocs'],
  title: 'Components/Auth/SingIn',
} as Meta<typeof SingIn>

type Story = StoryObj<typeof SingIn>

export const Default: Story = {
  args: {
    onSubmit: data => {
      console.log('Form submitted:', data)
    },
  } as SignInProps,
}

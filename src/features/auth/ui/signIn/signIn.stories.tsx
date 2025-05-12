import type { Meta, StoryObj } from '@storybook/react'

import { SignIn } from '@/features/auth/ui/signIn/SignIn'

export default {
  argTypes: {
    onSubmit: { action: 'submitted' }, // отображение действия отправки в Storybook
  },
  component: SignIn,
  tags: ['autodocs'],
  title: 'Components/Auth/SingIn',
} as Meta<typeof SignIn>

type Story = StoryObj<typeof SignIn>

export const Default: Story = {
  args: {
    onSubmit: (data: unknown) => {
      console.log('Form submitted:', data)
    },
  },
}
